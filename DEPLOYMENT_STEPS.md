# 🚀 DEPLOYMENT CHECKLIST - Week3 Tracker

## Prerequisites Setup (सबसे पहले ये करें)

### ✅ Step 0: Required Software Install करें

#### 1. Git Install करें
- **Download**: https://git-scm.com/download/win
- Install करते समय सभी default options रखें
- Install होने के बाद VS Code **restart** करें
- Check करें: नया terminal खोलें और type करें `git --version`

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### 📦 Step 1: MongoDB Atlas (Database) - FREE Forever

**Time: 10 minutes**

1. जाएं: https://www.mongodb.com/cloud/atlas/register
2. **Sign Up** करें:
   - Email से या
   - Google account से (आसान)
3. **Deploy a database** पर क्लिक करें
4. **M0 (FREE)** select करें
5. **Provider**: AWS
6. **Region**: Mumbai (ap-south-1) या closest
7. **Cluster Name**: Cluster0 (default ठीक है)
8. **Create** पर क्लिक करें

**Security Setup:**

**Database Access:**
1. Left sidebar में **Security → Database Access**
2. **Add New Database User** पर क्लिक करें
3. Authentication Method: **Password**
4. Username: `admin` या कुछ भी
5. Password: **Autogenerate Secure Password** पर क्लिक करें
6. Password **copy करें और safe रखें!** ⚠️
7. Database User Privileges: **Read and write to any database**
8. **Add User** पर क्लिक करें

**Network Access:**
1. Left sidebar में **Security → Network Access**
2. **Add IP Address** पर क्लिक करें
3. **Allow Access from Anywhere** पर क्लिक करें
4. **Confirm** पर क्लिक करें

**Connection String लें:**
1. Left sidebar में **Database**
2. अपने cluster के सामने **Connect** पर क्लिक करें
3. **Drivers** select करें
4. **Driver**: Node.js, **Version**: 4.1 or later
5. Connection string **copy** करें:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>` को अपने actual password से replace करें
7. अंत में `/` के बाद database name add करें:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/week3tracker?retryWrites=true&w=majority
   ```
8. ये पूरा string **save करें!** ❤️

✅ **MongoDB Atlas Setup Complete!**

---

### 🐙 Step 2: GitHub Repository - FREE Forever

**Time: 5 minutes**

1. जाएं: https://github.com
2. **Sign up** करें (अगर account नहीं है)
3. **Login** करें
4. Right top में **+** icon → **New repository**
5. Repository name: `week3-tracker`
6. Public या Private (आपकी choice)
7. **Create repository** पर क्लिक करें
8. अब VS Code में वापस आएं

**Terminal में ये commands run करें:**

```powershell
# Project folder में जाएं
cd c:\Users\mayur\OneDrive\Desktop\week3-tracker

# Git initialize करें
git init

# सभी files add करें
git add .

# Commit करें
git commit -m "Initial commit - ready for deployment"

# GitHub repository connect करें (अपना username डालें)
git remote add origin https://github.com/YOUR_USERNAME/week3-tracker.git

# Code push करें
git branch -M main
git push -u origin main
```

Username/Password मांगे तो:
- Username: आपका GitHub username
- Password: **Personal Access Token** use करें (password नहीं)
  - Token बनाएं: https://github.com/settings/tokens
  - **Generate new token (classic)**
  - Permissions: `repo` select करें
  - Token copy करें और password की जगह paste करें

✅ **GitHub Setup Complete!**

---

### 🌐 Step 3: Backend Deploy (Render.com) - FREE Forever

**Time: 10-15 minutes**

1. जाएं: https://render.com
2. **Get Started for Free** पर क्लिक करें
3. **Sign Up with GitHub** से sign up करें
4. GitHub को access allow करें
5. Dashboard पर आने के बाद:

**Create Web Service:**
1. **New +** → **Web Service**
2. **Build and deploy from a Git repository** → **Next**
3. **Connect** अपनी `week3-tracker` repository को
   - अगर दिखाई नहीं दे रही तो **Configure account** पर क्लिक करें
   - सभी repositories या specific repository select करें
4. Repository select करने के बाद **Connect**

**Configure Service:**
- **Name**: `week3-backend` (कुछ भी unique)
- **Region**: Singapore (nearest to India)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- **Free** select करें (पहले से selected होगा)

**Environment Variables** (यहां सावधानी से!):

**Add Environment Variable** पर क्लिक करके ये 3 add करें:

1. Key: `MONGO_URI`
   Value: `mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/week3tracker?retryWrites=true&w=majority`
   (अपना MongoDB connection string)

2. Key: `JWT_SECRET`
   Value: `my_super_secret_jwt_key_change_this_12345`

3. Key: `PORT`
   Value: `5000`

**Create Web Service** पर क्लिक करें!

**Wait for Deployment:**
- Deploy होने में 5-10 minutes लगेंगे
- **Logs** में progress दिखेगा
- Green tick दिखे और "Live" लिखा आए तो ready!

**Backend URL Copy करें:**
- Top पर आपको URL मिलेगा:
  ```
  https://week3-backend-xxxx.onrender.com
  ```
- ये URL **copy करें और save करें!** ❤️

✅ **Backend Deployed!**

---

### ⚡ Step 4: Frontend Deploy (Vercel) - FREE Forever

**Time: 5-10 minutes**

1. जाएं: https://vercel.com
2. **Sign Up** पर क्लिक करें
3. **Continue with GitHub** से sign up करें
4. GitHub को access allow करें

**Import Project:**
1. **Add New...** → **Project**
2. **Import Git Repository** section में
3. अपनी `week3-tracker` repository **Import** करें
4. अगर नहीं दिख रही तो:
   - **Adjust GitHub App Permissions**
   - अपनी repository को access दें

**Configure Project:**
- **Framework Preset**: Vite (auto-detect होगा)
- **Root Directory**: `front-end` (⚠️ Important!)
  - Click **Edit** next to Root Directory
  - Select `front-end` folder
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

**Environment Variables:**

**Add Environment Variable** पर क्लिक करें:

1. Key: `VITE_API_URL`
   Value: `https://week3-backend-xxxx.onrender.com`
   (अपना Render backend URL - जो आपने Step 3 में copy किया था)

**Deploy** पर क्लिक करें!

**Wait for Deployment:**
- Deploy होने में 2-3 minutes लगेंगे
- Progress bar दिखेगा
- "Congratulations" दिखे तो ready!

**Frontend URL:**
```
https://week3-tracker-xxxx.vercel.app
```

✅ **Frontend Deployed!**

---

## 🎉 Step 5: Testing

1. अपना Vercel URL browser में खोलें
2. **Register** पर क्लिक करें
3. नया user create करें
4. **Login** करें
5. Expense add करें

**Note**: पहली बार backend slow हो सकता है (30-60 seconds) क्योंकि Render free tier पर sleep से wake up होता है।

---

## ✅ SUCCESS! आपका Project LIVE है! 🎊

**Your URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: MongoDB Atlas

**100% FREE & LIFETIME!** 🆓

---

## 🔄 Future Updates कैसे करें?

Code में changes करने के बाद:

```powershell
git add .
git commit -m "Updated features"
git push
```

**Automatically deploy होगा!** Vercel और Render दोनों!

---

## ⚠️ Important Notes

1. **Render Free Tier**: 15 minutes inactive = sleep mode
   - First request पर 30-60 sec lag normal है

2. **MongoDB Atlas Free**: 512 MB storage (small apps के लिए काफी)

3. **Vercel Free**: Unlimited deployments, super fast!

---

## 🆘 Problems?

**Problem**: Backend response नहीं आ रहा
- Wait 1-2 minutes (cold start)
- Render logs check करें

**Problem**: Environment variables काम नहीं कर रहे
- Render/Vercel में variables re-check करें
- Service को **Manual Deploy** करें

**Problem**: Database connection failed
- MongoDB में IP whitelist (0.0.0.0/0)
- Connection string सही है check करें

---

Made with ❤️ for deployment!
