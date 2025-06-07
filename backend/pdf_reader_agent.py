from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
import fitz
import base64
import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
import asyncio
from langsmith import traceable

load_dotenv()

@traceable(name="read_page_async")
async def read_page_async(img_str: str, model_name: str, api_key: str):
    """Async function for reading a page"""
    model = ChatOpenAI(model=model_name, api_key=api_key)
    # Use ainvoke for async API calls
    return await model.ainvoke([
        {
            "role": "system",
            "content": "You are a pdf reader. You are given a page of a pdf file as an image. You need to read the text from the image and return it as a string. Only output the contents of the image, do not include any other text."
        },
        HumanMessage(
            content=[
                {"type": "text", "text": "Read the text from this image:"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{img_str}",
                        "detail": "high"
                    }
                },
            ],
        )
    ])

class PdfReaderAgent:
    def __init__(self, api_key: str, model_name: str = "gpt-4.1-nano"):
        self.model_name = model_name
        self.api_key = api_key
        
        # Create the tool function that references the class instance
        @traceable(name="read_pdf_tool")
        def read_pdf_func(pdf_path: str) -> str:
            """Read a PDF file and return the text"""
            return asyncio.run(self._read_pdf_async(pdf_path))
        
        # Apply the tool decorator to the function
        self.read_pdf_tool = tool(read_pdf_func)
        self.tools = [self.read_pdf_tool]
    
    @traceable(name="read_pdf_async")
    async def _read_pdf_async(self, pdf_path: str) -> str:
        """Async method to read PDF and process pages concurrently"""
        pdf_file = fitz.open(pdf_path)
        pages = [self._get_page_image(pdf_file.load_page(i)) for i in range(len(pdf_file))]
        
        # Create tasks for concurrent processing
        tasks = [
            read_page_async(page_img, self.model_name, self.api_key) 
            for page_img in pages
        ]
        
        # Execute all tasks concurrently
        results = await asyncio.gather(*tasks)
        page_texts = [result.content for result in results]
        
        return "\n\n".join(page_texts)
    
    def _get_page_image(self, page) -> str:
        """Convert page to base64 image string"""
        img_bytes = page.get_pixmap().tobytes("png")
        img_str = base64.b64encode(img_bytes).decode()
        return img_str

    def get_agent(self):
        return create_react_agent(
            model=ChatOpenAI(model=self.model_name, api_key=self.api_key),
            tools=self.tools
        )

if __name__ == "__main__":
    agent = PdfReaderAgent(os.getenv("OPENAI_API_KEY"))
    result = agent.get_agent().invoke({
        "messages": [
            {"role": "user", "content": "Read the pdf file at files/1905_17_132-148.pdf and give me a summary of the contents"}
        ]
    })
    print(result.get("messages")[-1].content)