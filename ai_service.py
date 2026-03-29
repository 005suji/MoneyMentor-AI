import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

# Forcing the key for the session to ensure connectivity
API_KEY = "AIzaSyA5rwUwMhjhbB6qlnFkjYU251e9D8XuCa8"
os.environ["GOOGLE_API_KEY"] = API_KEY

class AIService:
    def __init__(self):
        print(f"DEBUG: Initializing AI Service with API Key: {API_KEY[:8]}...", flush=True)
        try:
            self.llm = ChatGoogleGenerativeAI(
                model="gemini-pro",
                google_api_key=API_KEY,
                temperature=0.3
            )
            print("DEBUG: ChatGoogleGenerativeAI initialized successfully.", flush=True)
        except Exception as e:
            print(f"DEBUG: Initialization Error: {str(e)}", flush=True)

    async def get_financial_advice(self, user_data: dict, language: str = "en"):
        try:
            prompt = PromptTemplate(
                input_variables=["age", "income", "expenses", "investments", "loans", "goals", "lang"],
                template="""
                You are MoneyMentor AI, a personal finance expert for the Indian market.
                User Profile:
                - Age: {age}
                - Monthly Income: ₹{income}
                - Monthly Expenses: ₹{expenses}
                - Existing Investments: ₹{investments}
                - Loans/Debt: ₹{loans}
                - Financial Goals: {goals}
                
                Provide a concise financial health analysis and 3 actionable steps to improve their wealth.
                Respond in {lang}.
                """
            )
            
            chain = prompt | self.llm
            response = await chain.ainvoke({
                "age": user_data.get("age"),
                "income": user_data.get("monthly_income"),
                "expenses": user_data.get("monthly_expenses"),
                "investments": user_data.get("existing_investments"),
                "loans": user_data.get("loans_debt"),
                "goals": ", ".join(user_data.get("financial_goals", []) if user_data.get("financial_goals") else []),
                "lang": language
            })
            
            return response.content
        except Exception as e:
            print(f"AI Service Execution Error: {str(e)}", flush=True)
            return "I am currently re-calibrating my wealth insights. Please try again in a moment."

ai_service = AIService()
