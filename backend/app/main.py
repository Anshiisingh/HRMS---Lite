from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, routes
from .database import engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# Setup CORS
origins = [
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
    "*" # For ease of development/demo, but should be restricted in prod
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to HRMS Lite API"}
