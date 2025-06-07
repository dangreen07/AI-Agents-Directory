from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import asyncio
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
import uvicorn

from calculator_agent import CalculatorAgent
from pdf_reader_agent import PdfReaderAgent

load_dotenv()

# Pydantic models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    agent_id: str

class AgentInfo(BaseModel):
    id: str
    name: str
    description: str

# Global agents registry
agents_registry: Dict[str, Any] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize agents
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable is required")
    
    # Initialize calculator agent
    calc_agent = CalculatorAgent(api_key=api_key)
    agents_registry["calculator"] = {
        "agent": calc_agent.get_agent(),
        "info": AgentInfo(
            id="calculator",
            name="Calculator Agent",
            description="Performs mathematical calculations using basic arithmetic operations"
        )
    }
    
    # Initialize PDF reader agent
    pdf_agent = PdfReaderAgent(api_key=api_key)
    agents_registry["pdf_reader"] = {
        "agent": pdf_agent.get_agent(),
        "info": AgentInfo(
            id="pdf_reader", 
            name="PDF Reader Agent",
            description="Reads and analyzes PDF documents to extract text and provide summaries"
        )
    }
    
    print(f"Initialized {len(agents_registry)} agents")
    yield
    # Shutdown: cleanup if needed
    agents_registry.clear()

# Create FastAPI app with lifespan
app = FastAPI(
    title="AI Agents Backend",
    description="FastAPI backend for managing and interacting with AI agents",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/agents", response_model=List[AgentInfo])
async def list_agents():
    """Get list of all available agent IDs and their information"""
    return [agent_data["info"] for agent_data in agents_registry.values()]

@app.get("/agents/{agent_id}")
async def get_agent_info(agent_id: str):
    """Get detailed information about a specific agent"""
    if agent_id not in agents_registry:
        raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found")
    
    return agents_registry[agent_id]["info"]

async def generate_agent_response(agent_id: str, messages: List[ChatMessage]):
    """Generate streaming response from the specified agent"""
    if agent_id not in agents_registry:
        yield f"data: {json.dumps({'error': f'Agent {agent_id} not found'})}\n\n"
        return
    
    try:
        agent = agents_registry[agent_id]["agent"]
        
        # Convert messages to the format expected by langgraph
        formatted_messages = []
        for msg in messages:
            formatted_messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Send initial status
        yield f"data: {json.dumps({'status': 'processing', 'agent_id': agent_id})}\n\n"
        
        # Process with the agent
        response = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: agent.invoke({"messages": formatted_messages})
        )
        
        # Extract the final response
        if response and "messages" in response and response["messages"]:
            final_message = response["messages"][-1]
            final_content = final_message.content if hasattr(final_message, 'content') else str(final_message)
            
            # Stream the response in chunks for better UX
            chunk_size = 50
            for i in range(0, len(final_content), chunk_size):
                chunk = final_content[i:i+chunk_size]
                yield f"data: {json.dumps({'chunk': chunk, 'type': 'content'})}\n\n"
                await asyncio.sleep(0.1)  # Small delay for streaming effect
            
            # Send completion signal
            yield f"data: {json.dumps({'status': 'completed', 'agent_id': agent_id})}\n\n"
        else:
            yield f"data: {json.dumps({'error': 'No response generated'})}\n\n"
            
    except Exception as e:
        error_msg = f"Error processing request: {str(e)}"
        yield f"data: {json.dumps({'error': error_msg})}\n\n"

@app.post("/agents/{agent_id}/chat")
async def chat_with_agent(agent_id: str, request: ChatRequest):
    """Stream response from the specified agent for the given messages"""
    
    # Validate agent exists
    if agent_id not in agents_registry:
        raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found")
    
    # Override agent_id from URL parameter
    request.agent_id = agent_id
    
    return StreamingResponse(
        generate_agent_response(agent_id, request.messages),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream",
        }
    )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "agents_loaded": len(agents_registry),
        "available_agents": list(agents_registry.keys())
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
