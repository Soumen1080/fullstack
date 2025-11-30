# Express.js Interview Preparation Guide

## 1. What is Express?

### Definition
Express.js is a minimal, fast, and unopinionated web application framework for Node.js. It provides a robust set of features for building web and mobile applications, acting as a thin layer on top of Node.js that simplifies server creation and API development.

### Key Features
- **Middleware support**: Chain of functions to handle requests
- **Routing**: Define application endpoints and their handlers
- **Template engines**: Support for dynamic HTML rendering
- **HTTP utility methods**: Simplified request/response handling
- **Performance**: Thin layer, doesn't obscure Node.js features

### Example
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Interview Questions
- **Q: Why use Express instead of plain Node.js?**
  - A: Express simplifies routing, middleware management, and request/response handling compared to the http module in Node.js.

---

## 2. Getting Started with Express

### Installation
```bash
# Initialize a new Node.js project
npm init -y

# Install Express
npm install express

# Install nodemon for development (optional)
npm install --save-dev nodemon
```

### Basic Server Setup
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

### Project Structure
```
project/
├── node_modules/
├── routes/
│   ├── users.js
│   └── products.js
├── controllers/
├── models/
├── middleware/
├── app.js
└── package.json
```

---

## 3. Handling Requests

### Request Object (req)
The request object represents the HTTP request and contains properties for query strings, parameters, body, headers, etc.

### Common Request Properties
```javascript
app.get('/demo', (req, res) => {
  console.log(req.method);        // HTTP method (GET, POST, etc.)
  console.log(req.url);           // URL path
  console.log(req.headers);       // Request headers
  console.log(req.query);         // Query parameters
  console.log(req.params);        // Route parameters
  console.log(req.body);          // Request body (with middleware)
  console.log(req.cookies);       // Cookies (with cookie-parser)
});
```

### Handling Different Request Types
```javascript
// GET request
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST request
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: 'User created', user: { name, email } });
});

// PUT request
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  res.json({ message: `User ${userId} updated`, updates });
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} deleted` });
});
```

### Request Validation Example
```javascript
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  res.status(201).json({ message: 'User registered successfully' });
});
```

---

## 4. Sending a Response

### Response Object (res)
The response object represents the HTTP response that Express sends when it receives a request.

### Common Response Methods
```javascript
// Send plain text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ name: 'John', age: 30, role: 'Developer' });
});

// Send status code
app.get('/status', (req, res) => {
  res.sendStatus(404); // Sends 404 Not Found
});

// Set status and send response
app.get('/created', (req, res) => {
  res.status(201).json({ message: 'Resource created' });
});

// Send file
app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/files/document.pdf');
});

// Redirect
app.get('/old-route', (req, res) => {
  res.redirect('/new-route');
});

// Set headers
app.get('/custom-header', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<h1>Custom Header Response</h1>');
});
```

### Response Chaining
```javascript
app.get('/api/data', (req, res) => {
  res
    .status(200)
    .set('X-Custom-Header', 'value')
    .json({ success: true, data: [] });
});
```

### Error Responses
```javascript
app.get('/error', (req, res) => {
  try {
    // Some operation
    throw new Error('Something went wrong');
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
});
```

---

## 5. Routing

### Definition
Routing refers to determining how an application responds to client requests at specific endpoints (URIs) and HTTP methods.

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

app.post('/submit', (req, res) => {
  res.send('Form submitted');
});
```

### Route Methods
```javascript
// Handles all HTTP methods
app.all('/secret', (req, res) => {
  res.send('Accessing secret section');
});

// Multiple handlers
app.get('/multiple', 
  (req, res, next) => {
    console.log('First handler');
    next();
  },
  (req, res) => {
    res.send('Second handler sends response');
  }
);
```

### Express Router
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
  res.json({ message: 'Create new user' });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

### Route Organization
```javascript
// routes/products.js
const router = require('express').Router();

router.route('/')
  .get((req, res) => res.send('Get products'))
  .post((req, res) => res.send('Create product'));

router.route('/:id')
  .get((req, res) => res.send(`Get product ${req.params.id}`))
  .put((req, res) => res.send(`Update product ${req.params.id}`))
  .delete((req, res) => res.send(`Delete product ${req.params.id}`));

module.exports = router;
```

---

## 6. Installing Nodemon

### What is Nodemon?
Nodemon is a utility that monitors for changes in your source code and automatically restarts your server. Essential for development workflow.

### Installation
```bash
# Install as dev dependency
npm install --save-dev nodemon

# Or install globally
npm install -g nodemon
```

### Configuration

**package.json:**
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

**nodemon.json (optional configuration):**
```json
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["node_modules", "*.test.js"],
  "delay": 2000
}
```

### Usage
```bash
# Run with npm script
npm run dev

# Run directly (if installed globally)
nodemon app.js

# Run with specific file
nodemon server.js
```

### Interview Tip
- **Q: Why use nodemon?**
  - A: Nodemon improves developer productivity by automatically restarting the Node.js application when file changes are detected, eliminating manual server restarts.

---

## 7. Path Parameters

### Definition
Path parameters (route parameters) are named URL segments used to capture values at specific positions in the URL. They are part of the route definition.

### Syntax
```javascript
// Basic path parameter
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ message: `User ID is ${userId}` });
});

// URL: /users/123 → userId = "123"
```

### Multiple Parameters
```javascript
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ 
    message: `User ${userId}, Post ${postId}` 
  });
});

// URL: /users/42/posts/100
// userId = "42", postId = "100"
```

### Optional Parameters
```javascript
// Using regex for optional parameter
app.get('/products/:category/:subcategory?', (req, res) => {
  const { category, subcategory } = req.params;
  res.json({ category, subcategory: subcategory || 'all' });
});

// URL: /products/electronics → category = "electronics", subcategory = undefined
// URL: /products/electronics/phones → category = "electronics", subcategory = "phones"
```

### Parameter Validation
```javascript
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  res.json({ userId });
});
```

### Route Parameter Middleware
```javascript
// Runs for any route with :userId parameter
app.param('userId', (req, res, next, id) => {
  console.log(`User ID: ${id}`);
  // You can perform validation or database lookup here
  req.userId = id;
  next();
});

app.get('/users/:userId', (req, res) => {
  res.send(`Processing user ${req.userId}`);
});
```

### Real-World Example
```javascript
// Blog application routes
app.get('/blog/:year/:month/:slug', (req, res) => {
  const { year, month, slug } = req.params;
  
  res.json({
    article: slug,
    publishDate: `${year}-${month}`
  });
});

// URL: /blog/2024/01/express-guide
// year = "2024", month = "01", slug = "express-guide"
```

---

## 8. Query Strings

### Definition
Query strings are key-value pairs appended to the URL after a `?` symbol, used to send additional data to the server. Multiple parameters are separated by `&`.

### Syntax
```
URL: /search?q=express&page=1&limit=10
```

### Accessing Query Parameters
```javascript
app.get('/search', (req, res) => {
  const { q, page, limit } = req.query;
  
  res.json({
    searchTerm: q,
    page: page || 1,
    limit: limit || 10
  });
});

// URL: /search?q=nodejs&page=2&limit=20
// req.query = { q: 'nodejs', page: '2', limit: '20' }
```

### Query String vs Path Parameters

**Path Parameters:**
- Part of the route definition
- Required for route matching
- Used for identifying resources
- Example: `/users/:id`

**Query Strings:**
- Optional parameters
- Used for filtering, sorting, pagination
- Not part of route definition
- Example: `/users?role=admin&status=active`

### Practical Examples

**Filtering:**
```javascript
app.get('/products', (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  
  let products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'electronics' },
    { id: 2, name: 'Phone', price: 500, category: 'electronics' },
    { id: 3, name: 'Desk', price: 200, category: 'furniture' }
  ];
  
  // Filter by category
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  // Filter by price range
  if (minPrice) {
    products = products.filter(p => p.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    products = products.filter(p => p.price <= parseInt(maxPrice));
  }
  
  // Sort
  if (sort === 'price') {
    products.sort((a, b) => a.price - b.price);
  }
  
  res.json(products);
});

// URL: /products?category=electronics&minPrice=400&sort=price
```

**Pagination:**
```javascript
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const allPosts = [/* ... array of posts ... */];
  const paginatedPosts = allPosts.slice(skip, skip + limit);
  
  res.json({
    page,
    limit,
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / limit),
    data: paginatedPosts
  });
});

// URL: /api/posts?page=2&limit=5
```

**Search with Multiple Filters:**
```javascript
app.get('/users', (req, res) => {
  const { 
    search,      // text search
    role,        // filter by role
    status,      // filter by status
    sortBy,      // sort field
    order        // asc or desc
  } = req.query;
  
  res.json({
    filters: { search, role, status },
    sorting: { sortBy, order: order || 'asc' }
  });
});

// URL: /users?search=john&role=admin&status=active&sortBy=createdAt&order=desc
```

### Query String Parsing
```javascript
// Array in query string
// URL: /filter?tags=nodejs&tags=express&tags=mongodb
app.get('/filter', (req, res) => {
  console.log(req.query.tags); // ['nodejs', 'express', 'mongodb']
  res.json({ tags: req.query.tags });
});

// Nested objects (using qs library)
const qs = require('qs');
app.use((req, res, next) => {
  req.query = qs.parse(req.query);
  next();
});

// URL: /search?filter[price][min]=100&filter[price][max]=500
```

---

## Common Interview Questions & Answers

### Q1: What is middleware in Express?
**A:** Middleware are functions that have access to the request, response, and next middleware function. They can execute code, modify req/res objects, end the request-response cycle, or call the next middleware.

### Q2: Difference between req.params and req.query?
**A:** 
- `req.params`: Contains route parameters (e.g., `/users/:id`)
- `req.query`: Contains query string parameters (e.g., `/users?role=admin`)

### Q3: How to handle errors in Express?
**A:** Using error-handling middleware with 4 parameters:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

### Q4: What is app.use() in Express?
**A:** `app.use()` mounts middleware functions at a specified path. If no path is specified, it executes for every request.

### Q5: How to serve static files in Express?
**A:** 
```javascript
app.use(express.static('public'));
// Files in 'public' folder are now accessible
```

---

## Best Practices

1. **Use environment variables** for sensitive data
2. **Implement proper error handling**
3. **Use async/await** for asynchronous operations
4. **Validate and sanitize** user input
5. **Organize routes** using Express Router
6. **Use middleware** for common tasks
7. **Implement logging** (e.g., Morgan)
8. **Add security headers** (e.g., Helmet)
9. **Handle CORS** properly
10. **Use compression** for responses

---

## Additional Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [MDN Web Docs - Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node.js Documentation](https://nodejs.org/docs/)
