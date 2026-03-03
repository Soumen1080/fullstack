# Node.js Backend Development - Complete Notes

## Table of Contents
1. [Introduction to Node.js](#introduction)
2. [Setting Up Express Server](#express-setup)
3. [Routing](#routing)
4. [Middleware](#middleware)
5. [Database Integration](#database)
6. [Authentication & Authorization](#authentication)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)

---

## 1. Introduction to Node.js {#introduction}

**Node.js** is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.

### Key Features:
- **Non-blocking I/O**: Handles multiple requests simultaneously
- **Event-driven**: Uses events and callbacks
- **NPM**: Largest ecosystem of open-source libraries

### Example: Basic HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## 2. Setting Up Express Server {#express-setup}

**Express.js** is a minimal and flexible Node.js web application framework.

### Installation
```bash
npm init -y
npm install express
```

### Example: Basic Express Server
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Express Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## 3. Routing {#routing}

Routing refers to how an application responds to client requests at specific endpoints.

### Basic Routes
```javascript
// GET request
app.get('/api/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST request
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: 'User created', data: { name, email } });
});

// PUT request
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} updated` });
});

// DELETE request
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
});
```

### Route Parameters & Query Strings
```javascript
// Route parameters
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ productId });
});

// Query strings: /api/search?name=laptop&price=1000
app.get('/api/search', (req, res) => {
  const { name, price } = req.query;
  res.json({ searchTerm: name, maxPrice: price });
});
```

### Router Module (Organized Routes)
```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'All users' });
});

router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

module.exports = router;

// In main app.js
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
```

---

## 4. Middleware {#middleware}

Middleware functions have access to request, response objects and the next function.

### Types of Middleware:
1. **Application-level**: Bound to app instance
2. **Router-level**: Bound to router instance
3. **Built-in**: Express built-in middleware
4. **Third-party**: External packages
5. **Error-handling**: Special middleware for errors

### Example: Custom Middleware
```javascript
// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to next middleware
};

app.use(logger);

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token logic here
  req.user = { id: 1, name: 'John' };
  next();
};

// Apply to specific routes
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});
```

### Common Third-party Middleware
```javascript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Enable CORS
app.use(cors());

// Security headers
app.use(helmet());

// HTTP request logger
app.use(morgan('dev'));
```

---

## 5. Database Integration {#database}

### MongoDB with Mongoose

**Installation:**
```bash
npm install mongoose
```

**Connection:**
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
```

**Schema & Model:**
```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
```

**CRUD Operations:**
```javascript
const User = require('./models/User');

// CREATE
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ (All)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ (Single)
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

## 6. Authentication & Authorization {#authentication}

### JWT (JSON Web Token) Authentication

**Installation:**
```bash
npm install bcryptjs jsonwebtoken
```

**Implementation:**
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // Store in .env file

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      success: true, 
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected Route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});
```

---

## 7. Error Handling {#error-handling}

### Global Error Handler
```javascript
// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/api/users/:id', asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json({ success: true, data: user });
}));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler (must be last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err.stack);
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

---

## 8. Best Practices {#best-practices}

### Project Structure
```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── middlewares/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── utils/
│   └── helpers.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

### Environment Variables
```javascript
// Install dotenv
// npm install dotenv

// .env file
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
NODE_ENV=development

// Load in server.js
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;
```

### Input Validation
```javascript
// Install express-validator
// npm install express-validator

const { body, validationResult } = require('express-validator');

app.post('/api/users',
  // Validation rules
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
  
  // Handler
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process request...
  }
);
```

### Security Best Practices
1. Use HTTPS in production
2. Implement rate limiting
3. Validate and sanitize all inputs
4. Use helmet for security headers
5. Keep dependencies updated
6. Don't expose sensitive data in responses
7. Use environment variables for secrets
8. Implement proper logging

### Rate Limiting Example
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

---

## Complete Server Example

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Useful NPM Packages

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **express-validator**: Input validation
- **express-rate-limit**: Rate limiting
- **nodemon**: Auto-restart server (dev)

---

## Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
