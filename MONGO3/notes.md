# Codebase Concepts Dictionary

### 1. Express.js
**Definition:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
**Explanation:** It manages routing (handling different URLs), server creation, and processing incoming HTTP requests and outgoing responses.
**Codebase Example:**
```javascript
const express = require('express');
const app = express(); // Creates an Express application

app.get('/', (req, res) => { // Handles GET request to the root '/'
  res.send('Root is Working !!');
});

app.listen(8080, () => { // Starts the server on port 8080
  console.log('Server is running on port 8080');
});
```

### 2. Mongoose
**Definition:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
**Explanation:** It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
**Codebase Example:**
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}
```

### 3. Mongoose Schemas & Models
**Definition:** 
*   **Schema**: Defines the structure of the document, default values, validators, etc.
*   **Model**: A wrapper around the schema that provides an interface to the database for creating, querying, updating, deleting records, etc.
**Explanation:** In your code, you defined a `chatSchema` enforcing rules like `required: true` and `maxLength: 1000`. You then turned that schema into a Model named `Chat`.
**Codebase Example:**
```javascript
const chatSchema = new mongoose.Schema({
  from: { type: String, required: true },
  msg: { type: String, maxLength: 1000 }
});
const Chat = mongoose.model('Chat', chatSchema);
```

### 4. EJS (Embedded JavaScript)
**Definition:** EJS is a templating engine for Node.js.
**Explanation:** It allows you to generate HTML markup with plain JavaScript. By setting `app.set('view engine', 'ejs')`, you tell Express to use EJS whenever you render a view.
**Codebase Example:**
```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

### 5. Node.js Path Module
**Definition:** The `path` module provides utilities for working with file and directory paths.
**Explanation:** `path.join(__dirname, 'views')` securely joins the current directory of the script (`__dirname`) with the `views` folder. This ensures the path is formatted correctly regardless of the operating system (Windows uses `\` while Linux/Mac uses `/`).
**Codebase Example:**
```javascript
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
```

### 6. Asynchronous JavaScript (Promises & Async/Await)
**Definition:** A way to handle operations that take some time to complete (like connecting to a database or saving data) without pausing the execution of the rest of the application.
**Explanation:** 
*   **Async/Await:** Makes asynchronous code look synchronous. Here, `await mongoose.connect()` waits for the database to connect before moving on.
*   **Promises (.then / .catch):** A Promise represents the eventual completion (or failure) of an async operation. 
**Codebase Example:**
```javascript
main().then(() => console.log('Connected to MongoDB!'))
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}
```

### 7. Node.js CommonJS Modules (`require` and `module.exports`)
**Definition:** Node.js uses the CommonJS module system by default to include and export files and packages.
**Explanation:** `require()` is used to bring in built-in modules, npm packages, or your own local files. `module.exports` is used to expose variables or functions from a file so they can be consumed by other files.
**Codebase Example:**
```javascript
// In models/chat.js: Exporting the model
module.exports = Chat;

// In index.js: Importing the model
const Chat = require('./models/chat.js');
```

### 8. JavaScript Date Object
**Definition:** The built-in `Date` object represents a single moment in time in a platform-independent format.
**Explanation:** In your codebase, you use `Date.now` to set a default timestamp for when a chat message is created, and `new Date()` to explicitly define a timestamp. Time is saved according to Coordinated Universal Time (UTC) inside MongoDB.
**Codebase Example:**
```javascript
createdAt: { 
    type: Date,
    default: Date.now, // Automatically assigns the current date/time
}
```

### 9. Express Route Handlers (`app.get`)
**Definition:** A routing method in Express used to handle HTTP GET requests.
**Explanation:** It listens for incoming HTTP GET requests at a specific path (URL) and executes a callback function when a request is matched. Notice how it takes two parameters (`req` for the incoming request, and `res` for the outgoing response).
**Codebase Example:**
```javascript
app.get('/', (req, res) => {
  res.send('Root is Working !!');
});
```

### 10. Express Server Initialization (`app.listen`)
**Definition:** A method used to bind and listen for connections on the specified host and port.
**Explanation:** It fundamentally starts the HTTP server acting as a doorway. It allows your Node.js application to begin accepting incoming HTTP requests from clients over the network.
**Codebase Example:**
```javascript
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
```

### 11. Functions (Specifically `async` functions)
**Definition:** A block of reusable code designed to perform a particular task. An `async function` is a function that operates asynchronously via the event loop, returning an implicit Promise.
**Explanation:** In your codebase, `async function main()` is used to construct a custom function that wraps the asynchronous `mongoose.connect()` call, allowing you to use the modern, cleaner `await` keyword instead of complex `.then()` chains inside it.
**Codebase Example:**
```javascript
async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}
```

### 12. Mongoose Schemas (`mongoose.Schema`)
**Definition:** A configuration object for a Mongoose Model that thoroughly maps to a MongoDB collection and defines the shape of the documents within that collection.
**Explanation:** It dictates what fields a document can have, what data types those fields should be (String, Date, etc.), and what validation rules apply (like `required: true` and `maxLength: 1000`). It is a blueprint before a Model is actually compiled.
**Codebase Example:**
```javascript
const chatSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  msg: { type: String, required: true, maxLength: 1000 },
  createdAt: { type: Date, default: Date.now, required: true }
});
```