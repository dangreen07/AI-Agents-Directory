from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool

class CalculatorAgent:
    def __init__(self, api_key: str, model: str = "gpt-4.1-nano"):
        self.model = ChatOpenAI(model=model, api_key=api_key)
        @tool
        def multiply(a: float, b: float) -> float:
            """Multiply two numbers"""
            return a * b

        @tool
        def add(a: float, b: float) -> float:
            """Add two numbers"""
            return a + b

        @tool
        def subtract(a: float, b: float) -> float:
            """Subtract two numbers"""
            return a - b

        @tool
        def divide(a: float, b: float) -> float:
            """Divide two numbers"""
            return a / b
        self.tools = [multiply, add, subtract, divide]
    def get_agent(self):
        return create_react_agent(
            model=self.model,
            tools=self.tools
        )