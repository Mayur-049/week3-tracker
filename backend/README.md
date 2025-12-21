# Expense Tracker — Backend (Student Summary)

Short backend API built by a student using Node.js, Express, MongoDB, and JWT. Provides user auth and resource/expense CRUD endpoints to support the React frontend.

## Highlights (Short)
- Node + Express REST API
- MongoDB via Mongoose
- JWT-based authentication
- Users and Resources CRUD

---

# Tracker Backend

This repository contains the backend API for the "Tracker" project — a simple user + resource management API built with Node.js, Express and MongoDB.

**Quick summary**
- Node + Express API
- MongoDB (Mongoose)
- JWT authentication
- Routes for Users and Resources (CRUD)

**Goal / conversion idea**
- This backend is ready to be connected to a React (or React Native) frontend. A suggested conversion: build a React + Redux "Expense / Resource Tracker" single-page app that uses these endpoints for user authentication and resource management.

---

**Requirements**
- Node.js >= 16
- npm
- MongoDB (local or Atlas)

**Environment (.env)**
Create a `.env` file in the `backend/` folder with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=change_this_to_a_strong_random_value
```

Do not commit `.env` to source control. Add `/backend/.env` to `.gitignore`.

---

## Setup

1. Open a terminal in the `backend` folder:

```powershell
cd 'c:\Users\mayur\OneDrive\Desktop\Tracker\backend'
npm install
```

2. Start the server in development (requires `nodemon` already in `devDependencies` or installed globally):

```powershell
npm run dev
```

or start normally:

```powershell
npm start
```

The server listens on `PORT` (default `5000`).

---

## Available Endpoints (summary)
Base path: `/api`

Users
- `POST /api/User/register` — register a new user
  - Body (JSON):
    ```json
    {
      "name": "Alice",
      "mobile": "0123456789",
      "address": "123 Street",
      "email": "alice@example.com",
      "password": "secret123"
    }
    ```
  - Response: 201 created with user summary (id, name, email, role)

- `POST /api/User/login` — login
  - Body: `{ "email": "alice@example.com", "password": "secret123" }`
  - Response: JWT token and user info

- `GET /api/User` — list users (no password returned)
- `PUT /api/User/:id` — update a user
- `DELETE /api/User/:id` — delete a user
- `GET /api/User/protected` — example protected route (requires Authorization header)
tected
Resources (protected)
- `POST /api/Resource` — create resource (requires Authorization Bearer token)
  - Body example:
    ```json
    {
      "title": "Buy supplies",
      "description": "Office supplies",
      "category": "office",
      "amount": 150
    }
    ```
- `GET /api/Resource` — list resources for logged-in user
- `GET /api/Resource/:id` — get resource by id (only owner)
- `PUT /api/Resource/:id` — update resource (only owner)
- `DELETE /api/Resource/:id` — delete resource (only owner)

Authentication
- Use header: `Authorization: Bearer <token>` after login. Token is returned by `POST /api/User/login`.

---

## Testing

### Step 1: Register a User

```powershell
curl -X POST http://localhost:5000/api/User/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "John Doe",
    "mobile": "9876543210",
    "address": "456 Main Street, City",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Expected response (201)**:
```json
{
  "msg": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Step 2: Login

```powershell
curl -X POST http://localhost:5000/api/User/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Expected response (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Save the `token` value for protected requests.**

---

### Step 3: Get All Users

```powershell
curl -X GET http://localhost:5000/api/User `
  -H "Content-Type: application/json"
```

**Expected response (200)**: Array of users (passwords excluded).

---

### Step 4: Create a Resource (Protected)

Use the token from Step 2:

```powershell
curl -X POST http://localhost:5000/api/Resource `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." `
  -H "Content-Type: application/json" `
  -d '{
    "title": "Buy Office Supplies",
    "description": "Need pens, paper, and folders for the office",
    "category": "office",
    "status": "active",
    "amount": 250
  }'
```

**Expected response (201)**:
```json
{
  "message": "Resource created successfully",
  "resource": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Buy Office Supplies",
    "description": "Need pens, paper, and folders for the office",
    "category": "office",
    "status": "active",
    "amount": 250,
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-05T10:30:00Z",
    "updatedAt": "2025-12-05T10:30:00Z"
  }
}
```

---

### Step 5: Get All Resources for Logged-in User (Protected)

```powershell
curl -X GET http://localhost:5000/api/Resource `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected response (200)**:
```json
{
  "message": "Resources retrieved successfully",
  "count": 1,
  "resources": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Buy Office Supplies",
      "description": "Need pens, paper, and folders for the office",
      "category": "office",
      "status": "active",
      "amount": 250,
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-12-05T10:30:00Z"
    }
  ]
}
```

---

### Step 6: Get Single Resource by ID (Protected)

```powershell
curl -X GET http://localhost:5000/api/Resource/507f1f77bcf86cd799439012 `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected response (200)**: Single resource object.

---

### Step 7: Update a Resource (Protected)

```powershell
curl -X PUT http://localhost:5000/api/Resource/507f1f77bcf86cd799439012 `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." `
  -H "Content-Type: application/json" `
  -d '{
    "title": "Buy Office Supplies - Urgent",
    "amount": 300,
    "status": "completed"
  }'
```

**Expected response (200)**:
```json
{
  "message": "Resource updated successfully",
  "resource": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Buy Office Supplies - Urgent",
    "description": "Need pens, paper, and folders for the office",
    "category": "office",
    "status": "completed",
    "amount": 300,
    "createdBy": "507f1f77bcf86cd799439011",
    "updatedAt": "2025-12-05T10:35:00Z"
  }
}
```

---

### Step 8: Delete a Resource (Protected)

```powershell
curl -X DELETE http://localhost:5000/api/Resource/507f1f77bcf86cd799439012 `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected response (200)**:
```json
{
  "message": "Resource deleted successfully"
}
```

---

### Step 9: Protected Route Example

```powershell
curl -X GET http://localhost:5000/api/User/protected `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected response (200)**:
```json
{
  "msg": "Protected data access granted",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "address": "456 Main Street, City",
    "role": "user",
    "createdAt": "2025-12-05T10:00:00Z"
  }
}
```

---

### Error Examples

**Missing token (401)**:
```powershell
curl -X GET http://localhost:5000/api/Resource
```
Response:
```json
{
  "message": "No token provided, authorization denied"
}
```

**Invalid token (401)**:
```powershell
curl -X GET http://localhost:5000/api/Resource `
  -H "Authorization: Bearer invalid_token_here"
```
Response:
```json
{
  "message": "Token is not valid"
}
```

**Duplicate email (400)**:
```powershell
curl -X POST http://localhost:5000/api/User/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Jane Doe",
    "mobile": "1234567890",
    "address": "789 Another Street",
    "email": "john@example.com",
    "password": "AnotherPass123"
  }'
```
Response:
```json
{
  "msg": "User with this email or mobile already exists."
}
```

---

### Postman Collection (Alternative)
You can also import this backend into Postman:
1. Open Postman
2. Create a new collection "Tracker API"
3. Add requests for each endpoint above
4. Set a Postman variable `token` after login and use `{{token}}` in Authorization headers
5. Export the collection and save it alongside your code

---

## Recommended next improvements (short)
- Add input validation (`express-validator`) to all routes.
- Centralize error handling middleware and return consistent JSON errors.
- Use `helmet`, `morgan`, `express-rate-limit`, `express-mongo-sanitize` and `xss-clean` for security and logging.
- Remove default JWT fallback in production (require `JWT_SECRET` in env).
- Add pagination and filtering for resources.
- Add tests with Jest + Supertest and CI (GitHub Actions).

---

## Project conversion idea (short)
- Convert this backend into a React-based "Expense / Resource Tracker" web app:
  - Use React + Redux or Context for state.
  - Login/register flows, token stored in memory or secure cookie, and pages: Dashboard, Add Resource, My Resources, Admin (user management).

---

If you want, I can:
- Add a `README` section with curl/Postman-ready examples for each endpoint.
- Export a Postman collection JSON to include in the repo.
- Implement `express-validator` + a central error handler and wire them into the routes now.

Tell me which of these you want next and I will proceed.


