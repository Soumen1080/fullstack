# Node.js & Express.js Complete Guide

## Table of Contents
1. [What is Express?](#what-is-express)
2. [Getting Started with Express](#getting-started-with-express)
3. [Handling Requests](#handling-requests)
4. [Sending a Response](#sending-a-response)
5. [Routing](#routing)
6. [Installing Nodemon](#installing-nodemon)
7. [Path Parameters](#path-parameters)
8. [Query Strings](#query-strings)

---

## What is Express?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Key Features:
- Fast, unopinionated, minimalist web framework
- Robust routing
- HTTP helpers (redirection, caching, etc.)
- Middleware support
- Template engine support

### Why Use Express?
- Simplifies Node.js server creation
- Makes routing easy
- Handles middleware efficiently
- Large community support

---

## Getting Started with Express

### Installation

```bash
# Initialize a new Node.js project
npm init -y

# Install Express
npm install express
```

### Basic Server Setup

```javascript
// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

## Handling Requests

Express handles different HTTP methods (GET, POST, PUT, DELETE, PATCH).

### Example: Different Request Methods

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET Request
app.get('/api/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST Request
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.json({ 
    message: 'User created', 
    user: newUser 
  });
});

// PUT Request
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ 
    message: `User ${userId} updated` 
  });
});

// DELETE Request
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ 
    message: `User ${userId} deleted` 
  });
});

app.listen(3000);
```

---

## Sending a Response

Express provides multiple ways to send responses to clients.

### Response Methods

```javascript
const express = require('express');
const app = express();

// Send plain text
app.get('/text', (req, res) => {
  res.send('This is plain text');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ 
    name: 'John Doe', 
    age: 30 
  });
});

// Send status code
app.get('/status', (req, res) => {
  res.status(201).json({ 
    message: 'Resource created' 
  });
});

// Send file
app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/file.pdf');
});

// Redirect
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

// Set headers and send
app.get('/custom', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<h1>Custom Response</h1>');
});

app.listen(3000);
```

---

## Routing

Routing determines how an application responds to client requests to specific endpoints.

### Basic Routing

```javascript
const express = require('express');
const app = express();

// Basic routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

app.listen(3000);
```

### Using Express Router

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user' });
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);

app.listen(3000);
```

---

## Installing Nodemon

Nodemon automatically restarts your Node.js application when file changes are detected.

### Installation

```bash
# Install as dev dependency
npm install --save-dev nodemon

# Or install globally
npm install -g nodemon
```

### Configuration

Add to `package.json`:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

### Usage

```bash
# Run with nodemon
npm run dev

# Or if installed globally
nodemon app.js
```

### Nodemon Configuration File (nodemon.json)

```json
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["node_modules"],
  "delay": "2500"
}
```

---

## Path Parameters

Path parameters are named URL segments used to capture values at specific positions in the URL.

### Example

```javascript
const express = require('express');
const app = express();

// Single parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ 
    message: `User ID: ${userId}` 
  });
});

// Multiple parameters
app.get('/posts/:year/:month/:day', (req, res) => {
  const { year, month, day } = req.params;
  res.json({ 
    date: `${year}-${month}-${day}` 
  });
});

// Optional parameters (using regex)
app.get('/products/:category/:id?', (req, res) => {
  const { category, id } = req.params;
  res.json({ 
    category, 
    id: id || 'all' 
  });
});

// Pattern matching
app.get('/files/:filename([a-z]+\\.txt)', (req, res) => {
  res.json({ 
    filename: req.params.filename 
  });
});

app.listen(3000);
```

### Real-World Example

```javascript
const express = require('express');
const app = express();

// Sample data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ 
      error: 'User not found' 
    });
  }
});

app.listen(3000);
```

---

## Query Strings

Query strings are used to pass additional data to the server through the URL.

### Basic Query Strings

```javascript
const express = require('express');
const app = express();

// URL: /search?q=express&category=tutorials
app.get('/search', (req, res) => {
  const query = req.query.q;
  const category = req.query.category;
  
  res.json({ 
    searchQuery: query,
    category: category 
  });
});

app.listen(3000);
```

### Advanced Query String Handling

```javascript
const express = require('express');
const app = express();

// Sample products data
const products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'electronics' },
  { id: 2, name: 'Phone', price: 500, category: 'electronics' },
  { id: 3, name: 'Shirt', price: 30, category: 'clothing' },
  { id: 4, name: 'Shoes', price: 80, category: 'clothing' }
];

// URL: /products?category=electronics&minPrice=400&maxPrice=600&sort=price
app.get('/products', (req, res) => {
  let { category, minPrice, maxPrice, sort } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category === category
    );
  }
  
  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      p => p.price >= parseInt(minPrice)
    );
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      p => p.price <= parseInt(maxPrice)
    );
  }
  
  // Sort products
  if (sort === 'price') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  res.json({
    count: filteredProducts.length,
    products: filteredProducts
  });
});

app.listen(3000);
```

### Pagination Example

```javascript
const express = require('express');
const app = express();

const items = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}));

// URL: /items?page=2&limit=10
app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {
    currentPage: page,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit),
    items: items.slice(startIndex, endIndex)
  };
  
  if (endIndex < items.length) {
    results.nextPage = page + 1;
  }
  
  if (startIndex > 0) {
    results.previousPage = page - 1;
  }
  
  res.json(results);
});

app.listen(3000);
```

---

## Complete Application Example

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 }
];

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Express API');
});

// Get all users with query filters
// URL: /api/users?age=30&name=Bob
app.get('/api/users', (req, res) => {
  let filteredUsers = [...users];
  
  if (req.query.age) {
    filteredUsers = filteredUsers.filter(
      u => u.age === parseInt(req.query.age)
    );
  }
  
  if (req.query.name) {
    filteredUsers = filteredUsers.filter(
      u => u.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }
  
  res.json({
    count: filteredUsers.length,
    users: filteredUsers
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.age = req.body.age || user.age;
  
  res.json(user);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Best Practices

1. **Use environment variables for configuration**
2. **Implement proper error handling**
3. **Use middleware for common tasks**
4. **Validate input data**
5. **Use async/await for asynchronous operations**
6. **Follow REST API conventions**
7. **Implement rate limiting**
8. **Use CORS when needed**
9. **Log requests and errors**
10. **Keep routes organized in separate files**

---

## Useful Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
