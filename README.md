# Week 3 Assignment - Expense Tracker

This is my full stack Expense Tracker application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User Registration & Login
- Add, Edit, Delete Expenses
- View total expenses
- Responsive Design

## Tech Stack
- **Frontend:** React, Vite, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

---

## How to Run Locally

1. **Backend:**
   - Go to `backend` folder: `cd backend`
   - Install dependencies: `npm install`
   - Create `.env` file and add `MONGO_URI`, `JWT_SECRET`, and `PORT=5000`.
   - Start server: `npm start`

2. **Frontend:**
   - Go to `front-end` folder: `cd front-end`
   - Install dependencies: `npm install`
   - Start React app: `npm run dev`

---

## Deployment Steps

I have deployed this project using Render (for Backend) and Vercel (for Frontend). Here are the steps:

### Step 1: Database (MongoDB Atlas)
1. Created an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Created a free cluster (M0).
3. In **Network Access**, allowed access from anywhere (`0.0.0.0/0`).
4. In **Database Access**, created a user and password.
5. Copied the connection string for the backend.

### Step 2: Backend Deployment (Render)
1. Pushed code to GitHub.
2. Logged into [Render.com](https://render.com).
3. Created a new **Web Service**.
4. Connected my GitHub repository.
5. Settings used:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Added Environment Variables: `MONGO_URI`, `JWT_SECRET`, `PORT`.

### Step 3: Frontend Deployment (Vercel)
1. Logged into [Vercel.com](https://vercel.com).
2. Imported the GitHub repository.
3. Settings used:
   - Framework: Vite
   - Root Directory: `front-end`
4. Added Environment Variable:
   - `VITE_API_URL`: The URL provided by Render (e.g., `https://week3-backend.onrender.com`).
5. Clicked Deploy.

---

## Common Issues & Fixes
- If backend gives error, check MongoDB IP whitelist is set to `0.0.0.0/0`.
- If frontend cannot fetch data, check if `VITE_API_URL` is correct in Vercel settings.
- Render free tier takes 1 minute to wake up if inactive.
