# Node.js Basics - Complete Guide

## 📌 Table of Contents
1. [What is Node.js?](#1-what-is-nodejs)
2. [Node Installation](#2-node-installation)
3. [Installation Links](#3-installation-links)
4. [Node REPL](#4-node-repl)
5. [Node Files](#5-node-files)
6. [Process in Node](#6-process-in-node)
7. [Export in Files](#7-export-in-files)
8. [Export in Directories](#8-export-in-directories)
9. [What is npm?](#9-what-is-npm)
10. [Installing Packages](#10-installing-packages)
11. [package.json](#11-packagejson)
12. [Local vs Global Installation](#12-local-vs-global-installation)
13. [Import Modules](#13-import-modules)

---

## 1. What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.

**Key Features:**
- Asynchronous and event-driven
- Single-threaded but highly scalable
- Non-blocking I/O operations

**Example:**
```javascript
console.log("Hello from Node.js!");
```

---

## 2. Node Installation

Download and install Node.js from the official website. The installation includes npm (Node Package Manager).

**Verify Installation:**
```bash
node -v
npm -v
```

---

## 3. Installation Links

- **Official Website:** [https://nodejs.org](https://nodejs.org)
- **LTS Version:** Recommended for production
- **Current Version:** Latest features

---

## 4. Node REPL

REPL stands for Read-Eval-Print-Loop. It's an interactive shell for testing JavaScript code.

**Start REPL:**
```bash
node
```

**Example Usage:**
```javascript
> 2 + 2
4
> const name = "Node"
undefined
> name
'Node'
> .exit  // to exit
```

---

## 5. Node Files

Create and execute JavaScript files using Node.js.

**Example - app.js:**
```javascript
const message = "Hello from Node file!";
console.log(message);
```

**Run the file:**
```bash
node app.js
```

---

## 6. Process in Node

The `process` object provides information about the current Node.js process.

### 6.1 Basic Process Information

**process.version** - Returns the Node.js version:
```javascript
console.log(process.version);
// Output: v18.16.0
```

**process.platform** - Returns the operating system platform:
```javascript
console.log(process.platform);
// Output: 'win32' (Windows), 'darwin' (Mac), 'linux' (Linux)
```

**process.arch** - Returns the CPU architecture:
```javascript
console.log(process.arch);
// Output: 'x64', 'arm', 'ia32', etc.
```

### 6.2 Directory and Path Information

**process.cwd()** - Returns current working directory:
```javascript
console.log(process.cwd());
// Output: C:\Users\ASUS\PRACTICE\fullstack\backend(Node.js)\basic
```

**process.chdir()** - Change current working directory:
```javascript
console.log('Before:', process.cwd());
process.chdir('../');
console.log('After:', process.cwd());
```

### 6.3 Environment Variables

**process.env** - Access environment variables:
```javascript
console.log(process.env.NODE_ENV);   // 'development' or 'production'
console.log(process.env.PORT);       // Port number
console.log(process.env.PATH);       // System PATH
console.log(process.env.USERNAME);   // Current user

// Setting environment variables
process.env.MY_VARIABLE = 'my_value';
console.log(process.env.MY_VARIABLE); // 'my_value'
```

**Example - config.js:**
```javascript
const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017'
};

console.log(config);
// { port: 3000, nodeEnv: 'development', dbUrl: 'mongodb://localhost:27017' }
```

### 6.4 Command Line Arguments

**process.argv** - Array of command line arguments:
```javascript
// app.js
console.log(process.argv);
console.log('First argument:', process.argv[0]);  // Node executable path
console.log('Second argument:', process.argv[1]); // File path
console.log('User arguments:', process.argv.slice(2));
```

**Run with arguments:**
```bash
node app.js username=John age=25 --port=3000
```

**Output:**
```javascript
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\ASUS\\app.js',
  'username=John',
  'age=25',
  '--port=3000'
]
```

**Practical Example - CLI Tool:**
```javascript
// greet.js
const args = process.argv.slice(2);
const name = args[0] || 'Guest';
const greeting = args[1] || 'Hello';

console.log(`${greeting}, ${name}!`);

// Usage:
// node greet.js John Hi
// Output: Hi, John!
```

### 6.5 Process Memory and Performance

**process.memoryUsage()** - Returns memory usage:
```javascript
const mem = process.memoryUsage();
console.log({
    rss: `${Math.round(mem.rss / 1024 / 1024)} MB`,        // Total memory
    heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(mem.external / 1024 / 1024)} MB`
});
```

**process.uptime()** - Returns process uptime in seconds:
```javascript
console.log(`Process running for ${process.uptime()} seconds`);
```

### 6.6 Process Exit

**process.exit()** - Terminates the process:
```javascript
console.log('Starting...');
if (someError) {
    console.error('Error occurred!');
    process.exit(1); // Exit with error code
}
console.log('Success!');
process.exit(0); // Exit successfully
```

**Exit codes:**
- `0` - Success
- `1` - General error
- `2` - Misuse of shell command

**process.on('exit')** - Handle exit event:
```javascript
process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
});
```

### 6.7 Practical Example - Complete App

**processInfo.js:**
```javascript
// Display comprehensive process information
console.log('=== Node.js Process Information ===\n');

console.log('1. System Info:');
console.log('   Node Version:', process.version);
console.log('   Platform:', process.platform);
console.log('   Architecture:', process.arch);
console.log('   PID:', process.pid);

console.log('\n2. Directory Info:');
console.log('   Current Directory:', process.cwd());
console.log('   Executed File:', process.argv[1]);

console.log('\n3. Memory Usage:');
const mem = process.memoryUsage();
console.log('   Heap Used:', Math.round(mem.heapUsed / 1024 / 1024), 'MB');
console.log('   Total Memory:', Math.round(mem.rss / 1024 / 1024), 'MB');

console.log('\n4. Runtime:');
console.log('   Uptime:', process.uptime(), 'seconds');

console.log('\n5. Environment:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('   User:', process.env.USERNAME || process.env.USER);

console.log('\n6. Command Arguments:');
console.log('   Arguments:', process.argv.slice(2));
```

**Run it:**
```bash
node processInfo.js arg1 arg2 --flag=value
```

---

## 7. Export in Files

Use `module.exports` to export functions, objects, or variables from one file to another.

**math.js:**
```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
```

**app.js:**
```javascript
const math = require('./math');
console.log(math.add(5, 3));      // 8
console.log(math.subtract(5, 3)); // 2
```

---

## 8. Export in Directories

Create an `index.js` file in a directory to export multiple modules.

**utils/index.js:**
```javascript
const math = require('./math');
const string = require('./string');

module.exports = { math, string };
```

**app.js:**
```javascript
const utils = require('./utils');
console.log(utils.math.add(10, 5));
```

---

## 9. What is npm?

npm (Node Package Manager) is the default package manager for Node.js, used to install and manage dependencies.

**Features:**
- Largest software registry
- Dependency management
- Script running

---

## 10. Installing Packages

Install packages locally or globally using npm.

**Install a package:**
```bash
npm install express
npm i express          # shorthand
```

**Install specific version:**
```bash
npm install express@4.17.1
```

**Install dev dependency:**
```bash
npm install nodemon --save-dev
```

---

## 11. package.json

A manifest file that contains metadata about your project and dependencies.

**Create package.json:**
```bash
npm init
npm init -y  # with defaults
```

**Example package.json:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
```

---

## 12. Local vs Global Installation

**Local Installation:**
- Installed in `node_modules` folder
- Project-specific dependencies
```bash
npm install express
```

**Global Installation:**
- Installed system-wide
- Available as CLI tools
```bash
npm install -g nodemon
```

**Check global packages:**
```bash
npm list -g --depth=0
```

---

## 13. Import Modules

**CommonJS (require):**
```javascript
const express = require('express');
const fs = require('fs');
const myModule = require('./myModule');
```

**ES6 Modules (import):**
Add `"type": "module"` in package.json

```javascript
import express from 'express';
import fs from 'fs';
import { add, subtract } from './math.js';
```

**Built-in Modules:**
```javascript
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
```

---

## 🎯 Quick Commands Reference

```bash
node filename.js           # Run a file
node                       # Start REPL
npm init                   # Initialize project
npm install package        # Install package
npm install               # Install all dependencies
npm uninstall package     # Remove package
npm update                # Update packages
npm list                  # List installed packages
```

---