# HRMS Lite

A lightweight **Human Resource Management System** built with **FastAPI** (Backend) and **React** (Frontend).

This application allows an admin to manage employee records and track daily attendance efficiently.

## 🚀 Features

-   **Employee Management**: Add, View, List, and Delete employees.
-   **Attendance Tracking**: Mark daily attendance (Present/Absent) and view history.
-   **Dashboard**: Real-time summary of total employees and daily attendance stats.
-   **Data Persistence**: SQLite database (local) with support for PostgreSQL (production).

## 🛠 Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS, Axios, React Router.
-   **Backend**: Python, FastAPI, SQLAlchemy, Pydantic.
-   **Database**: SQLite (default), PostgreSQL (supported).

## 📦 Prerequisites

-   **Node.js** (v18+)
-   **Python** (v3.9+)

## ⚡ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd HRMS-Lite
```

### 2. Backend Setup
Navigate to the backend folder and set up the Python environment:
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```
Start the Backend Server:
```bash
uvicorn app.main:app --reload
```
The API will run at: `http://localhost:8000`  
API Documentation: `http://localhost:8000/docs`

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder:
```bash
cd frontend
npm install
```
Start the Frontend Server:
```bash
npm run dev
```
The App will run at: `http://localhost:5173`

## 📂 Project Structure

```
├── backend/
│   ├── app/            # FastAPI app (models, routes, schemas)
│   ├── requirements.txt
│   └── hrms.db         # SQLite Database (generated)
├── frontend/
│   ├── src/            # React Code (components, pages, services)
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🌍 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) (if available) for instructions on deploying to Render and Vercel.
