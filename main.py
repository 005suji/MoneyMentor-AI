from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import onboarding, chat

app = FastAPI(title="MoneyMentor AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(onboarding.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "Welcome to MoneyMentor AI API", "status": "online"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "MoneyMentor AI"}
