# HRMS Lite Deployment Guide

This detailed guide will walk you through deploying your HRMS Lite application.
- **Backend (Python FastAPI)** -> Deployed on **Render.com**
- **Database (PostgreSQL)** -> Hosted on **Render.com**
- **Frontend (React Vite)** -> Deployed on **Vercel.com**

## Prerequisites

1.  **Code on GitHub**: You mentioned you have already pushed your code. Ensure the new configuration files I just created (`backend/Procfile`, `backend/runtime.txt`, `frontend/vercel.json`) are also pushed to GitHub.
    ```bash
    git add .
    git commit -m "Add deployment config files"
    git push
    ```

---

## Part 1: Backend Deployment (Render)

### Step 1: Create a Database
1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click the **New +** button and select **PostgreSQL**.
3.  **Name**: Enter `hrms-db`.
4.  **Region**: Choose a region close to you (e.g., Singapore, Frankfurt).
5.  **Instance Type**: Select **Free**.
6.  Click **Create Database**.
7.  Wait for it to be created.
8.  **IMPORTANT:** Copy the **Internal Database URL**. It will look like `postgres://hrms_user:password@hostname/hrms_db`. Keep this safe!

### Step 2: Create the Web Service (Backend)
1.  Go back to the [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your **GitHub repository**.
4.  **Name**: Enter `hrms-backend`.
5.  **Region**: Choose the *same region* as your database.
6.  **Branch**: `main` (or your default branch).
7.  **Root Directory**: Enter `backend` (This is crucial!).
8.  **Runtime**: Select **Python 3**.
9.  **Build Command**: `pip install -r requirements.txt`
10. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
11. **Instance Type**: Select **Free**.
12. **Environment Variables**:
    - Scroll down to "Environment Variables".
    - Click **Add Environment Variable**.
    - **Key**: `DATABASE_URL`
    - **Value**: Paste the **Internal Database URL** you copied in Step 1.
    - Click **Create Web Service**.

### Step 3: Verify Backend
1.  Wait for the deployment to finish. You should see "Build successful" and "Deploying...".
2.  Once live, copy the URL at the top left (e.g., `https://hrms-backend.onrender.com`).
3.  Open it in your browser. You should see: `{"message": "Welcome to HRMS Lite API"}`.

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Import Project
1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Select your GitHub repository and click **Import**.

### Step 2: Configure Project
1.  **Project Name**: `hrms-frontend` (or similar).
2.  **Framework Preset**: Select **Vite**.
3.  **Root Directory**:
    - Click **Edit**.
    - Select the `frontend` folder.
    - Click **Continue**.

### Step 3: Environment Variables
1.  Expand the **Environment Variables** section.
2.  Add a new variable:
    - **Key**: `VITE_API_URL`
    - **Value**: Paste your **Backend URL** from Render (e.g., `https://hrms-backend.onrender.com`).
      - *Note: Do not include a trailing slash `/` at the end.*
3.  Click **Add**.

### Step 4: Deploy
1.  Click **Deploy**.
2.  Vercel will build your project. This might take a minute.
3.  Once done, you will see a "Congratulations!" screen.
4.  Click **Continue to Dashboard** -> **Visit**.

---

## Verified!
You now have:
- A live backend on Render.
- A hosted database on Render.
- A live frontend on Vercel.

If you encounter any issues, please check the 'Logs' tab in Render or Vercel for error messages.
