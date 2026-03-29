from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_service import ai_service
from typing import List, Dict

router = APIRouter(prefix="/api/chat", tags=["Chat"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_data: Dict
    language: str = "en"

@router.post("/")
async def chat_with_mentor(request: ChatRequest):
    try:
        # For now, we'll take the latest user message and context
        user_message = request.messages[-1].content
        
        # We can pass the whole history eventually, but for now let's focus on context
        advice = await ai_service.get_financial_advice(
            request.user_data, 
            request.language
        )
        
        # Enhancing the advice based on user question
        enhanced_prompt = f"The user asked: '{user_message}'. Given their profile context: {advice}. Provide a direct and helpful answer in {request.language}."
        
        # Direct call to the model via ai_service (we can add a new method later)
        # For now, we use a simple chain logic
        response = await ai_service.get_financial_advice(request.user_data, request.language)
        return {"role": "assistant", "content": response}
    except Exception as e:
        print(f"Chat Route Error: {str(e)}")
        return {"role": "assistant", "content": "I'm having trouble connecting to my financial wisdom right now. Please try again later."}
