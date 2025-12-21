# Quick Deployment Steps (Hindi + English)

## 🚀 Step-by-Step Deployment

### 1️⃣ GitHub Repository बनाएं

1. https://github.com/new पर जाएं
2. Repository name: `week3-tracker` या कुछ भी
3. Public या Private select करें
4. **Create repository** पर क्लिक करें

### 2️⃣ Code को GitHub पर Push करें

Terminal में ये commands run करें:

```powershell
cd c:\Users\mayur\OneDrive\Desktop\week3-tracker

# Git initialize करें (अगर पहले से नहीं है)
git init
git add .
git commit -m "Ready for deployment"

# अपनी GitHub repository link डालें
git remote add origin https://github.com/YOUR_USERNAME/week3-tracker.git
git branch -M main
git push -u origin main
```

### 3️⃣ MongoDB Atlas Setup (Database)

1. जाएं: https://www.mongodb.com/cloud/atlas/register
2. Sign Up करें (Google account से)
3. **Create a Deployment** → **Free (M0)** select करें
4. Provider: **AWS** या **Azure**
5. Region: **Mumbai** या closest
6. Cluster Name: कुछ भी (default ठीक है)
7. **Create** पर क्लिक करें

**Security Setup:**
1. **Database Access** में जाएं → **Add New Database User**
   - Username: `myuser` (कुछ भी)
   - Password: `mypassword123` (strong password)
   - **Add User** पर क्लिक करें

2. **Network Access** में जाएं → **Add IP Address**
   - **Allow Access from Anywhere** (0.0.0.0/0)
   - **Confirm** पर क्लिक करें

**Connection String लें:**
1. **Database** → **Connect** पर क्लिक करें
2. **Drivers** select करें
3. Connection string copy करें:
   ```
   mongodb+srv://myuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. `<password>` को अपने actual password से replace करें
5. Database name add करें:
   ```
   mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/week3tracker?retryWrites=true&w=majority
   ```

### 4️⃣ Backend Deploy करें (Render.com)

1. जाएं: https://render.com
2. Sign Up करें (GitHub account से)
3. **Dashboard** → **New +** → **Web Service**
4. **Build and deploy from a Git repository**
5. अपनी GitHub repository select करें
6. Settings भरें:

   **Basic:**
   - Name: `week3-backend` (कुछ भी)
   - Region: **Singapore** या closest
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Instance:**
   - Instance Type: **Free**

   **Environment Variables** (Add करें):
   ```
   MONGO_URI = mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/week3tracker?retryWrites=true&w=majority
   JWT_SECRET = my_super_secret_jwt_key_12345_change_this
   PORT = 5000
   ```

7. **Create Web Service** पर क्लिक करें
8. Deploy होने का wait करें (5-10 minutes)
9. URL मिलेगा जैसे: `https://week3-backend.onrender.com`
10. ये URL **save** कर लें! ❤️

### 5️⃣ Frontend Deploy करें (Vercel)

1. जाएं: https://vercel.com
2. Sign Up करें (GitHub account से)
3. **Add New...** → **Project**
4. अपनी GitHub repository import करें
5. Settings भरें:

   **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `front-end`
   - Build Command: `npm run build` (auto-detect हो जाएगा)
   - Output Directory: `dist` (auto-detect हो जाएगा)
   - Install Command: `npm install` (auto-detect हो जाएगा)

   **Environment Variables** (Add करें):
   ```
   VITE_API_URL = https://week3-backend.onrender.com
   ```
   ☝️ यहां अपना Render backend URL डालें!

6. **Deploy** पर क्लिक करें
7. Deploy होने का wait करें (2-3 minutes)
8. URL मिलेगा जैसे: `https://week3-tracker.vercel.app`

### 6️⃣ Testing करें

1. अपना Vercel URL browser में खोलें
2. **Register** करें → नया user बनाएं
3. **Login** करें
4. Expenses add करें

**Note:** पहली बार backend थोड़ा slow हो सकता है (30-60 seconds) क्योंकि Render free tier sleep से wake up होता है।

---

## 🎊 Congratulations!

आपका project अब **LIVE** है! 🎉

- ✅ **Frontend**: Vercel पर
- ✅ **Backend**: Render पर  
- ✅ **Database**: MongoDB Atlas पर
- ✅ **100% FREE & LIFETIME**

---

## 🔄 Future Updates कैसे करें?

Code में changes करने के बाद:

```powershell
git add .
git commit -m "Updated features"
git push
```

Vercel और Render **automatically** deploy कर देंगे!

---

## ⚠️ Important Tips

1. **Render Free Tier:**
   - 15 minutes inactive रहने पर sleep हो जाता है
   - पहली request पर 30-60 sec lag हो सकता है
   - ये normal है!

2. **MongoDB Atlas Free:**
   - 512 MB storage (काफी है small apps के लिए)
   - Connection limit: 500 concurrent connections

3. **Vercel Free:**
   - Unlimited deployments
   - Super fast
   - No sleep time

---

## 🆘 Problems?

**Problem 1:** Backend URL से response नहीं आ रहा
- **Solution:** 1-2 minutes wait करें (cold start)

**Problem 2:** CORS error आ रहा है
- **Solution:** Backend में already CORS enabled है, Vercel में सही VITE_API_URL डाला है check करें

**Problem 3:** Database connection failed
- **Solution:** 
  - MongoDB Atlas में IP whitelist check करें (0.0.0.0/0)
  - Connection string सही है check करें
  - Password में special characters हैं तो URL encode करें

---

## 📞 Need More Help?

अगर कोई step समझ नहीं आया तो पूछ सकते हो! 😊
