# Copilot Instructions for Fullstack JavaScript Practice Repository

## Project Overview
This is a **learning-focused JavaScript practice repository** organized into progressive modules from basic JavaScript fundamentals to full-stack web development with Node.js and Express. It's structured as a personal learning workspace, not a production application.

## Repository Architecture

### Directory Structure & Purpose
- **`basics/`** - Foundational JavaScript (variables, conditionals, strings, methods). Files numbered sequentially (1-12)
- **`JS(Part 3)` through `JS(Part 10)/`** - Progressive JavaScript topics organized by learning modules:
  - Part 4: Interactive projects (TO-DO list)
  - Part 5: Game logic and object manipulation
  - Part 7: `this` keyword, arrow functions (see `thisWithArrowFunction.md`)
  - Part 8: Advanced arrays, ES6 methods (map, filter, reduce)
  - Part 9: DOM manipulation with practical examples
- **`backend(Node.js)/`** - Node.js fundamentals and package experiments
  - `basic/`: Core Node concepts (modules, process, exports)
  - `figletDir/`: Package usage examples (figlet library)
- **`Express js/`** - Express.js server basics and routing

### File Naming Conventions
- Numbered files (e.g., `1.js`, `2.js`) indicate sequential learning exercises
- Descriptive names use camelCase (e.g., `gussingGame.js`, `objectList.js`)
- Each major topic directory contains a `note.md` or `notes .md` with comprehensive interview-prep documentation

## Key Patterns & Conventions

### Module System
Files use **mixed module systems** as learning evolves:
- CommonJS in backend: `module.exports` / `require()`
- ES6 modules in newer files: `export` / `import`
- Example in `backend(Node.js)/basic/math.js`: Uses ES6 exports (`export const add = ...`)

### Documentation Style
**Each topic includes interview-focused markdown notes** with:
- Concept definitions with "What is..." sections
- Code examples with inline comments showing expected outputs
- Interview Q&A sections (see `Express js/note.md`)
- Concise bullet points for quick review

Example from notes:
```javascript
// From notes - outputs shown as comments
const doubled = a.map(x => x * 2);      // [2,4,6,8]
const evens = a.filter(x => x % 2 === 0); // [2,4]
```

### Express.js Conventions
- Port: Default `3000` (see `Express js/index.js`)
- No middleware parsing configured in basic example
- `app.use()` placed after `app.listen()` (learning example - not production pattern)

### Code Organization
- **No test files present** - this is a practice/learning workspace
- **Empty placeholder files exist** (e.g., `toDo.js`, `gussingGame.js`) - works in progress
- **Inline problem descriptions**: Each exercise file includes problem statement in comments

## Development Workflow

### Running Code
For Node.js files in `backend(Node.js)/`:
```bash
node backend(Node.js)/basic/math.js
```

For Express server:
```bash
cd "Express js"
npm install
node index.js
# Server runs on http://localhost:3000
```

For browser JavaScript (basics, JS Parts):
- Open corresponding HTML file in browser (e.g., `basics/index.html`)
- Or use browser console for standalone `.js` files

### Package Management
- Each subdirectory with npm packages has its own `package.json`
- No workspace-level dependency management
- Install dependencies per-directory: `cd [directory] && npm install`

## AI Agent Guidance

### When Creating New Exercises
1. Follow the numbered sequence pattern for related exercises
2. Add problem description in multi-line comments at file top
3. Include example input/output in comments
4. Match the learning level to the directory (basics vs advanced parts)

### When Explaining Concepts
- Reference the extensive markdown notes in each directory
- Point to specific numbered files as examples
- Use the interview Q&A format present in notes

### When Debugging
- Check if packages are installed in the correct subdirectory
- Verify module system matches the file's context (CommonJS vs ES6)
- Empty files may be intentional placeholders

### Don't Assume
- Production-ready patterns (this is a learning repo)
- Test coverage or CI/CD setup
- Consistent code style across all directories (style evolves with learning)
- Single package.json at root (dependencies are per-directory)
