# DOM Manipulation Interview Prep Notes

This guide covers the essential concepts of DOM manipulation in JavaScript, perfect for preparing for technical interviews.

---

### 1. What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the structure of an HTML or XML document as a tree-like structure where each node is an object representing a part of the document.

- **Tree Structure**: The DOM represents an HTML document as a logical tree. Each branch of the tree ends in a node, and each node contains objects.
- **Interface**: It provides a way for programming languages like JavaScript to connect to the document and manipulate it. You can change the document's structure, style, and content.
- **Live**: The DOM is a "live" representation. When you modify the DOM with JavaScript, the changes are reflected in the user's browser almost instantly.

![DOM Tree](https://media.geeksforgeeks.org/wp-content/uploads/20230331181323/DOM-Tree.png)

---

### 2. Selecting Elements

To manipulate an element, you first need to select it. JavaScript provides several methods to do this.

#### a. `getElementById()`
Selects a single element by its unique `id`. Since IDs are unique, this method returns only one element.

**HTML:**
```html
<h1 id="main-heading">Welcome!</h1>
```

**JavaScript:**
```javascript
const heading = document.getElementById('main-heading');
heading.style.color = 'blue'; // Changes the text color to blue
console.log(heading);
```

#### b. `getElementsByClassName()`
Selects a collection of elements that share the same class name. It returns an `HTMLCollection` (an array-like object).

**HTML:**
```html
<ul>
    <li class="list-item">Apple</li>
    <li class="list-item">Banana</li>
    <li class="list-item">Cherry</li>
</ul>
```

**JavaScript:**
```javascript
const items = document.getElementsByClassName('list-item');
// Loop through the collection to apply a style
for (let i = 0; i < items.length; i++) {
    items[i].style.fontWeight = 'bold';
}
```

#### c. `getElementsByTagName()`
Selects all elements with a given tag name (e.g., `<p>`, `<div>`, `<li>`). It also returns an `HTMLCollection`.

**HTML:**
```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

**JavaScript:**
```javascript
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length); // Output: 2
```

#### d. `querySelector()` and `querySelectorAll()`
These are modern and versatile methods that use CSS selectors to find elements.

- **`querySelector()`**: Returns the **first** element that matches the specified selector.
- **`querySelectorAll()`**: Returns a **static `NodeList`** containing all elements that match the selector.

**HTML:**
```html
<div id="container">
    <p class="content">First paragraph.</p>
    <p class="content">Second paragraph.</p>
</div>
```

**JavaScript:**
```javascript
// querySelector: Selects the first element with class 'content'
const firstContent = document.querySelector('.content');
console.log(firstContent);

// querySelectorAll: Selects all elements with class 'content'
const allContent = document.querySelectorAll('.content');
allContent.forEach(p => {
    p.style.fontStyle = 'italic';
});

// You can use any complex CSS selector
const firstContentInDiv = document.querySelector('#container .content');
console.log(firstContentInDiv);
```

---

### 3. Setting Content in Elements

You can change the content inside an element using `innerText`, `textContent`, and `innerHTML`.

- **`innerText`**: Renders text content, being aware of styling (it won't return text that is hidden with CSS).
- **`textContent`**: Returns all text content, including that of script/style elements and hidden elements. It's generally faster.
- **`innerHTML`**: Parses the given string as HTML and inserts it into the element. **Be cautious with user-provided input to avoid XSS attacks.**

**HTML:**
```html
<div id="my-div">This is some <strong>old</strong> text.</div>
```

**JavaScript:**
```javascript
const myDiv = document.getElementById('my-div');

// Using innerText
console.log(myDiv.innerText); // "This is some old text."
myDiv.innerText = "New text via innerText.";

// Using textContent
console.log(myDiv.textContent); // "New text via innerText."
myDiv.textContent = "New text via textContent.";

// Using innerHTML
myDiv.innerHTML = "This is <b>new and bold</b> text.";
```

---

### 4. Manipulating Attributes

You can get, set, and remove HTML attributes.

- **`getAttribute(attrName)`**: Gets the value of an attribute.
- **`setAttribute(attrName, value)`**: Sets the value of an attribute.
- **`removeAttribute(attrName)`**: Removes an attribute.

**HTML:**
```html
<a id="my-link" href="/old-path">Click me</a>
<img id="my-image" src="image.png">
```

**JavaScript:**
```javascript
const link = document.getElementById('my-link');
const img = document.getElementById('my-image');

// Get an attribute
const href = link.getAttribute('href');
console.log(href); // "/old-path"

// Set an attribute
link.setAttribute('href', '/new-path');
img.setAttribute('alt', 'My awesome image');

// Remove an attribute
img.removeAttribute('alt');
```

---

### 5. Manipulating Style

You can directly change the CSS of an element using the `style` property.

**HTML:**
```html
<p id="style-para">Style me!</p>
```

**JavaScript:**
```javascript
const p = document.getElementById('style-para');

p.style.color = 'white';
p.style.backgroundColor = 'teal'; // Use camelCase for multi-word properties
p.style.fontSize = '20px';
p.style.padding = '10px';
p.style.borderRadius = '5px';
```

---

### 6. `classList` Property

The `classList` property is a convenient way to manage an element's classes without manipulating the class string directly.

- **`add(className)`**: Adds a class.
- **`remove(className)`**: Removes a class.
- **`toggle(className)`**: Adds the class if it doesn't exist, otherwise removes it.
- **`contains(className)`**: Checks if the element has the specified class.

**CSS:**
```css
.highlight {
    background-color: yellow;
    border: 1px solid red;
}
.big-text {
    font-size: 24px;
}
```

**HTML:**
```html
<p id="class-para">I am a paragraph.</p>
```

**JavaScript:**
```javascript
const para = document.getElementById('class-para');

// Add a class
para.classList.add('highlight');

// Add multiple classes
para.classList.add('big-text', 'another-class');

// Remove a class
para.classList.remove('another-class');

// Toggle a class
setInterval(() => {
    para.classList.toggle('highlight');
}, 1000); // Toggles the highlight every second

// Check for a class
console.log(para.classList.contains('big-text')); // true
```

---

### 7. DOM Navigation

You can move between nodes in the DOM tree.

- **`parentElement`**: The parent element.
- **`children`**: An `HTMLCollection` of the element's child elements.
- **`previousElementSibling` / `nextElementSibling`**: The element sibling before or after the current one.

**HTML:**
```html
<div id="parent">
    <p id="first">First child</p>
    <p id="middle">Middle child</p>
    <p id="last">Last child</p>
</div>
```

**JavaScript:**
```javascript
const middleChild = document.getElementById('middle');

// Get parent
const parentDiv = middleChild.parentElement;
console.log(parentDiv); // The div with id 'parent'

// Get siblings
const prevSibling = middleChild.previousElementSibling;
console.log(prevSibling); // The p with id 'first'

const nextSibling = middleChild.nextElementSibling;
console.log(nextSibling); // The p with id 'last'

// Get all children of the parent
const allChildren = parentDiv.children;
console.log(allChildren); // HTMLCollection of the three <p> elements
```

---

### 8. Adding and Removing Elements

You can dynamically create new elements and add them to the DOM, or remove existing ones.

#### Adding Elements
1.  **`createElement(tagName)`**: Creates a new element.
2.  **`appendChild(childNode)`**: Appends a node as the last child of a parent.

**JavaScript:**
```javascript
// 1. Create a new <li> element
const newLi = document.createElement('li');

// 2. Add content to it
newLi.textContent = 'New Item';

// 3. Select the parent (e.g., a <ul>) and append the new element
const list = document.querySelector('ul'); // Assuming a <ul> exists
list.appendChild(newLi);
```

#### Removing Elements
- **`removeChild(childNode)`**: Removes a child node from a parent.
- **`remove()`**: A modern method called directly on the element to be removed.

**HTML:**
```html
<ul id="my-list">
    <li id="item-to-remove">Delete Me</li>
</ul>
```

**JavaScript:**
```javascript
// Modern way (preferred)
const itemToRemove = document.getElementById('item-to-remove');
if (itemToRemove) {
    itemToRemove.remove();
}

// Old way
const listParent = document.getElementById('my-list');
const item = document.getElementById('item-to-remove'); // Re-select if already removed
if (listParent && item) {
    listParent.removeChild(item);
}
```
