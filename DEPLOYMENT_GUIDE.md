# 🚀 Free Deployment Guide - Week3 Tracker

आपका project **FREE और LIFETIME** deploy करने के लिए complete guide:

---

## 📋 Prerequisites

1. **GitHub Account** बनाएं (अगर नहीं है): https://github.com
2. **Vercel Account** बनाएं: https://vercel.com (GitHub से sign in करें)
3. **Render Account** बनाएं: https://render.com (GitHub से sign in करें)
4. **MongoDB Atlas Account** बनाएं: https://www.mongodb.com/cloud/atlas/register

---

## Part 1: Database Setup (MongoDB Atlas - FREE)

### Step 1: MongoDB Atlas Setup
1. https://www.mongodb.com/cloud/atlas/register पर जाएं
2. **Free tier** (M0) select करें
3. **Cluster** create करें
4. **Database Access** में:
   - Username और Password बनाएं (ये याद रखें!)
5. **Network Access** में:
   - "Add IP Address" पर क्लिक करें
   - "Allow Access from Anywhere" select करें (0.0.0.0/0)
6. **Connect** button पर क्लिक करें
7. "Connect your application" select करें
8. **Connection String** copy करें (ये दिखेगा):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
9. `<password>` को अपने actual password से replace करें

---

## Part 2: Backend Deployment (Render.com - FREE)

### Step 1: GitHub पर Code Push करें

Terminal में ये commands run करें:

```bash
# Backend folder में जाएं
cd c:\Users\mayur\OneDrive\Desktop\week3-tracker

# Git initialize करें (अगर नहीं है)
git init
git add .
git commit -m "Initial commit"

# GitHub पर new repository बनाएं (https://github.com/new)
# फिर ये commands run करें (अपना username/repo name डालें):
git remote add origin https://github.com/YOUR_USERNAME/week3-tracker.git
git branch -M main
git push -u origin main
```

### Step 2: Render.com पर Deploy करें

1. https://render.com पर login करें
2. **"New +"** → **"Web Service"** select करें
3. अपनी GitHub repository connect करें
4. ये settings डालें:
   - **Name**: `week3-tracker-backend`
   - **Region**: Singapore या closest region
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Environment Variables** add करें:
   ```
   MONGO_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/week3tracker?retryWrites=true&w=majority
   JWT_SECRET = your_super_secret_key_12345
   PORT = 5000
   ```

6. **"Create Web Service"** पर क्लिक करें

7. Deploy होने का wait करें (5-10 मिनट)

8. आपको एक **URL** मिलेगा जैसे:
   ```
   https://week3-tracker-backend.onrender.com
   ```
   ये URL save कर लें!

---

## Part 3: Frontend Deployment (Vercel - FREE)

### Step 1: Frontend को Configure करें

पहले हम `.env` file बनाएंगे और API URL update करेंगे।

### Step 2: Vercel पर Deploy करें

1. https://vercel.com पर login करें
2. **"Add New..."** → **"Project"** select करें
3. अपनी GitHub repository import करें
4. ये settings डालें:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables** add करें:
   ```
   VITE_API_URL = https://week3-tracker-backend.onrender.com
   ```

6. **"Deploy"** पर क्लिक करें

7. Deploy होने के बाद आपको URL मिलेगा:
   ```
   https://week3-tracker.vercel.app
   ```

---

## Part 4: Frontend में API URL Update करें

अब आपको frontend code में backend URL डालना होगा।

---

## 🎉 Congratulations!

आपका project अब **LIVE** है और **100% FREE**!

- **Frontend URL**: https://your-project.vercel.app
- **Backend URL**: https://your-backend.onrender.com
- **Database**: MongoDB Atlas (Free M0 cluster)

---

## ⚠️ Important Notes

1. **Render.com Free Plan**: 
   - 15 minutes inactivity के बाद service sleep हो जाती है
   - First request पर wake up होने में 30-60 seconds लग सकते हैं
   - ये normal है, cost बचाने के लिए

2. **Vercel Free Plan**:
   - Unlimited deployments
   - Fast और reliable
   - कोई sleep time नहीं

3. **MongoDB Atlas Free**:
   - 512 MB storage free
   - Shared cluster
   - Basic apps के लिए काफी है

---

## 🔄 Future Updates

Code update करने के लिए बस:

```bash
git add .
git commit -m "Updated code"
git push
```

Vercel और Render automatically deploy कर देंगे!

---

## 🆘 Troubleshooting

**Problem**: Backend URL से response नहीं आ रहा
- **Solution**: 1-2 minutes wait करें (first time या sleep से wake up)

**Problem**: CORS error
- **Solution**: Backend में CORS properly configure है, check करें

**Problem**: Database connection error
- **Solution**: MongoDB Atlas में IP whitelist check करें (0.0.0.0/0 होना चाहिए)

---

## 📞 Need Help?

अगर कोई problem आए तो mujhe batao! 😊
