import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

class DatabaseService:
    def __init__(self):
        self.client = None
        self.db = None
        self.mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.database_name = os.getenv("DATABASE_NAME", "money_mentor_ai")

    def connect(self):
        self.client = AsyncIOMotorClient(self.mongodb_url)
        self.db = self.client[self.database_name]

    def get_collection(self, collection_name: str):
        if self.db is None:
            self.connect()
        return self.db[collection_name]

db_service = DatabaseService()
