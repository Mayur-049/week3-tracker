# 🛠️ Deployment Troubleshooting Guide (Hindi)

अगर आपका Backend (Render) या Frontend (Vercel) नहीं चल रहा है, तो ये check करें:

## 🚨 Problem: "Server Error" या "Not Fetch" (Failed to Fetch)

इसका मतलब है कि आपका Backend **Crash** हो गया है (502 Bad Gateway)।
यह 99% केस में **MongoDB Connection** फेल होने की वजह से होता है।

### ✅ Solution 1: MongoDB Network Access (Most Common Fix)

Render (Cloud) से MongoDB connect करने के लिए आपको allow करना होगा:

1. **MongoDB Atlas** जाएं (cloud.mongodb.com)।
2. left sidebar में **Network Access** पर क्लिक करें।
3. देखें कि क्या `0.0.0.0/0` (Allow Access from Anywhere) लिस्ट में है?
4. अगर नहीं है:
   - **+ Add IP Address** पर क्लिक करें।
   - **Allow Access from Anywhere** चुनें।
   - **Confirm** करें।
5. 2-3 मिनट wait करें और फिर अपनी App check करें।

### ✅ Solution 2: Connection String Password

अगर आपके password में `@`, `:`, `/`, या `#` जैसे special characters हैं, तो connection fail हो सकता है।

1. अपना password change करके simple रखें (e.g., `mypassword123`).
2. **Database Access** → Edit User → Change Password.
3. फिर Render पर जाकर `MONGO_URI` update करें।

### ✅ Solution 3: Check Render Logs (Error पता लगाने के लिए)

1. **Render Dashboard** पर जाएं।
2. अपनी backend service (`week3-backend`) पर क्लिक करें।
3. **Logs** tab पर क्लिक करें।
4. लाल रंग में Error देखें।
   - अगर `MongooseServerSelectionError` या `connection timed out` है → तो **Network Access** (Solution 1) issue है।
   - अगर `Authentication failed` है → तो **Password** (Solution 2) issue है।

---

## 🔍 How to Verify?

1. सीधा Backend URL खोलें: `https://week3-backend-im7f.onrender.com/`
2. अगर आपको **"API is running..."** दिखता है, तो Backend **FIX** हो गया है! 🎉
3. अगर **502 Bad Gateway** दिखता है, तो Backend अभी भी खराब है।
