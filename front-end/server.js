import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route to avoid "Cannot GET /" confusion
app.get('/', (req, res) => {
  res.status(200).send(
    'Expense Tracker API is running. Try /api/health or /api/users'
  );
});

// In-memory database (simulating a real database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  { id: 4, name: 'sunit vsv', email: 'sunit62@example.com', role: 'Admin' }
];

let nextId = 5;

// GET - Fetch all users
app.get('/api/users', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET - Fetch a single user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST - Create a new user
app.post('/api/users', (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required'
      });
    }

    // Check if email already exists
    const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new user
    const newUser = {
      id: nextId++,
      name: name.trim(),
      email: email.trim(),
      role: role.trim()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT - Update an existing user
app.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, role } = req.body;

    // Find user
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required'
      });
    }

    // Check if email already exists (for other users)
    const emailExists = users.find(u => 
      u.id !== userId && u.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists for another user'
      });
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      email: email.trim(),
      role: role.trim()
    };

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: users[userIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE - Remove a user
app.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Find user
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const deletedUser = users[userIndex];
    
    // Remove user from array
    users.splice(userIndex, 1);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/api/users - Fetch all users`);
  console.log(`   GET    http://localhost:${PORT}/api/users/:id - Fetch single user`);
  console.log(`   POST   http://localhost:${PORT}/api/users - Create new user`);
  console.log(`   PUT    http://localhost:${PORT}/api/users/:id - Update user`);
  console.log(`   DELETE http://localhost:${PORT}/api/users/:id - Delete user`);
});
