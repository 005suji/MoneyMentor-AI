from pydantic import BaseModel, Field
from typing import List, Optional

class UserOnboarding(BaseModel):
    age: int
    monthly_income: float
    monthly_expenses: float
    existing_investments: float = 0.0
    loans_debt: float = 0.0
    risk_tolerance: str = Field(..., pattern="^(Low|Medium|High)$")
    financial_goals: List[str]
    retirement_age: int = 60
    selected_language: str = "en"

class UserResponse(BaseModel):
    user_id: str
    status: str
    message: str
