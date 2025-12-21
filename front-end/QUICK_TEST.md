# 🧪 Quick CRUD Testing Guide

## ⚡ Quick Start (2 Terminal Windows)

### Terminal 1 - Backend:
```powershell
cd c:\Users\mayur\OneDrive\Desktop\expense-tracker
node server.js
```
Expected: `🚀 Server is running on http://localhost:5000`

### Terminal 2 - Frontend:
```powershell
cd c:\Users\mayur\OneDrive\Desktop\expense-tracker
npm run dev
```
Expected: `➜  Local:   http://localhost:5173/`

---

## 📋 Test Scenarios (Copy & Paste Ready)

### ✅ Test 1: CREATE - Add New User
**Test Data:**
- Name: `Alice Johnson`
- Email: `alice.johnson@example.com`
- Role: `Manager`

**Expected Result:**
- ✅ Green toast: "User 'Alice Johnson' added successfully! 🎉"
- ✅ Green alert: "✅ User created successfully - User: Alice Johnson"
- ✅ New card appears in user list
- ✅ Form clears automatically

**Error Test - Duplicate Email:**
- Name: `Bob Smith`
- Email: `john@example.com` (already exists)
- Expected: Red alert: "Email already exists"

---

### ✅ Test 2: READ - View All Users
**Steps:**
1. Open http://localhost:5173/
2. Navigate to Users page
3. Observe loading spinner briefly

**Expected Result:**
- ✅ Shows 4 initial users (or more if you added in Test 1)
- ✅ Each card displays: Name, Email, Role, Edit & Delete buttons
- ✅ Bottom shows: "✅ Data successfully fetched from Backend API"
- ✅ No errors in browser console

---

### ✅ Test 3: UPDATE - Edit a User
**Steps:**
1. Click "✏️ Edit" on "John Doe" card
2. Change Name to: `John Updated`
3. Click "💾 Update User"

**Expected Result:**
- ✅ Modal closes
- ✅ Card updates with "John Updated"
- ✅ Green toast: "User updated successfully!"
- ✅ Data persists on page refresh

**Error Test - Invalid Email:**
1. Click "✏️ Edit" on any user
2. Change email to: `invalid-email` (no @)
3. Expected: Red alert: "Please enter a valid email address"

---

### ✅ Test 4: DELETE - Remove a User
**Steps:**
1. Click "🗑️ Delete" on any user card
2. Confirm modal appears
3. Click "🗑️ Yes, Delete User"

**Expected Result:**
- ✅ Card disappears immediately
- ✅ Green toast: "User deleted successfully!"
- ✅ User removed from backend
- ✅ Other users remain unchanged

**Cancel Test:**
1. Click "🗑️ Delete" on any user
2. Click "Cancel" button
3. Expected: Modal closes, user stays in list

---

## 🔍 Validation Tests

### Test Email Validation:
```
Valid:   test@example.com ✅
Invalid: test.example.com ❌
Invalid: @example.com ❌
Invalid: test@ ❌
```

### Test Name Validation:
```
Valid:   "John Doe" ✅
Invalid: "A" (less than 2 chars) ❌
Invalid: "" (empty) ❌
```

### Test Role Validation:
```
Valid:   "Admin", "User", "Manager", "Developer" ✅
Invalid: (no selection) ❌
```

---

## 🛠️ API Testing with curl (Optional)

### GET All Users:
```powershell
curl http://localhost:5000/api/users
```

### GET Single User:
```powershell
curl http://localhost:5000/api/users/1
```

### CREATE User:
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    role = "Admin"
} | ConvertTo-Json

curl -Method POST `
  -Uri http://localhost:5000/api/users `
  -ContentType "application/json" `
  -Body $body
```

### UPDATE User:
```powershell
$body = @{
    name = "Updated Name"
    email = "updated@example.com"
    role = "Manager"
} | ConvertTo-Json

curl -Method PUT `
  -Uri http://localhost:5000/api/users/1 `
  -ContentType "application/json" `
  -Body $body
```

### DELETE User:
```powershell
curl -Method DELETE http://localhost:5000/api/users/1
```

---

## 📊 Expected Backend Responses

### Success (201/200):
```json
{
  "success": true,
  "message": "User created/updated/deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Admin"
  }
}
```

### Error (400/404/500):
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "validation error details"
}
```

---

## 🐛 Debugging Tips

### Check Browser Console (F12):
- Look for API request/response logs
- Verify success/error messages
- Check for JavaScript errors

### Check Terminal:
- Backend: Should show no errors
- Frontend: Vite compilation status

### Network Tab (F12):
- POST request should return 201
- PUT request should return 200
- DELETE request should return 200
- GET request should return 200

---

## ✅ Final Checklist

- [ ] Backend server running on :5000
- [ ] Frontend server running on :5173
- [ ] Can load users page
- [ ] Can add new user
- [ ] Can edit user
- [ ] Can delete user
- [ ] Error messages appear correctly
- [ ] Toast notifications work
- [ ] Data syncs between frontend/backend
- [ ] No console errors

---

## 📸 Screenshots Needed for Submission

1. **Backend Running Screenshot**
   - Terminal showing server started

2. **Frontend Users Page**
   - Users list with 4+ users

3. **CREATE Test**
   - Add user form filled
   - Success message visible

4. **UPDATE Test**
   - Edit modal open
   - User updated

5. **DELETE Test**
   - Confirmation modal
   - Success message
   - User removed from list

6. **Error Message Example**
   - Any error message shown

---

**All CRUD operations are now fully implemented with error handling and user experience enhancements! 🎉**
