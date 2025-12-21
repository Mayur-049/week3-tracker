# Week3 Tracker - Expense Management System 💰

एक complete full-stack expense tracking application जो **FREE** deploy हो सकती है!

## 🌟 Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Add/Edit/Delete Expenses
- ✅ Categorize Expenses (Food, Transport, Entertainment, etc.)
- ✅ User Management (Admin features)
- ✅ Responsive Design with Bootstrap
- ✅ Dark/Light Mode Toggle

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Bootstrap
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
week3-tracker/
├── backend/               # Backend API
│   ├── config/           # Database configuration
│   ├── middleware/       # Auth middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── front-end/            # Frontend React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── config.js     # API configuration
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── public/           # Static files
│
├── DEPLOYMENT_GUIDE.md   # Detailed deployment guide
└── QUICK_DEPLOY.md       # Quick deployment steps
```

## 🚀 Local Development

### Prerequisites
- Node.js (v14 या higher)
- MongoDB (local या Atlas)
- Git

### Backend Setup

```powershell
# Backend folder में जाएं
cd backend

# Dependencies install करें
npm install

# .env file बनाएं
copy .env.example .env

# .env में ये values डालें:
# MONGO_URI=mongodb://localhost:27017/week3tracker
# JWT_SECRET=your_secret_key
# PORT=5000

# Server start करें
npm start
```

Backend चलेगा: `http://localhost:5000`

### Frontend Setup

```powershell
# नई terminal खोलें
cd front-end

# Dependencies install करें
npm install

# .env file बनाएं
copy .env.example .env

# .env में ये value डालें:
# VITE_API_URL=http://localhost:5000

# Development server start करें
npm run dev
```

Frontend चलेगा: `http://localhost:5173`

## 🌐 Production Deployment

**FREE & LIFETIME deployment के लिए:**

1. **Quick Guide**: देखें [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
2. **Detailed Guide**: देखें [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### Deployment Platforms (सभी FREE):

- **Frontend**: Vercel
- **Backend**: Render.com
- **Database**: MongoDB Atlas

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000  # या production backend URL
```

## 🔑 API Endpoints

### User Routes
- `POST /api/User/register` - Register new user
- `POST /api/User/login` - Login user
- `GET /api/User` - Get all users
- `GET /api/User/:id` - Get user by ID
- `PUT /api/User/:id` - Update user
- `DELETE /api/User/:id` - Delete user

### Resource Routes (Protected)
- `POST /api/Resource` - Add new expense
- `GET /api/Resource` - Get user's expenses
- `GET /api/Resource/:id` - Get expense by ID
- `PUT /api/Resource/:id` - Update expense
- `DELETE /api/Resource/:id` - Delete expense

## 🧪 Testing

### Test User Create करें
```powershell
cd backend
node check_user.js
```

### User Reset करें
```powershell
cd backend
node reset_user.js
```

## 📱 Screenshots

*(Add screenshots of your app here)*

## 🤝 Contributing

Contributions welcome हैं! Pull requests भेजें।

## 📄 License

ISC License

## 👨‍💻 Author

आपका नाम

## 🆘 Support

Problems हो तो:
1. [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) में Troubleshooting section देखें
2. GitHub issues create करें

---

Made with ❤️ in India
