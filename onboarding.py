from fastapi import APIRouter, HTTPException
from models.user import UserOnboarding, UserResponse
from services.ai_service import ai_service
from services.db_service import db_service
import uuid

router = APIRouter(prefix="/api/onboarding", tags=["Onboarding"])

@router.post("/", response_model=UserResponse)
async def start_onboarding(user_data: UserOnboarding):
    user_id = str(uuid.uuid4())
    
    # Save to MongoDB
    try:
        users_collection = db_service.get_collection("users")
        user_dict = user_data.dict()
        user_dict["user_id"] = user_id
        await users_collection.insert_one(user_dict)
    except Exception as e:
        print(f"Database error: {e}")
        # Continue even if DB fails for now (for dev)
    
    try:
        # Get AI insights
        advice = await ai_service.get_financial_advice(user_data.dict(), user_data.selected_language)
        
        return UserResponse(
            user_id=user_id,
            status="success",
            message=advice
        )
    except Exception as e:
        # Fallback if AI fails (e.g., missing API key)
        return UserResponse(
            user_id=user_id,
            status="partial_success",
            message="Onboarding successful, but AI insights are currently unavailable. Please check your API key."
        )
