# DOM Events Interview Prep Notes

This guide covers the essential concepts of DOM events in JavaScript, perfect for preparing for technical interviews.

---

### 1. What are DOM Events?

DOM Events are signals sent by the browser to notify your code that something has happened on the web page. These events can be triggered by user interactions (like clicks or key presses) or by the browser itself (like a page finishing loading).

By "listening" for these events, you can write JavaScript code that runs in response, making your web pages interactive.

---

### 2. Event Listeners

The most common way to handle events is by using an **event listener**. The `addEventListener()` method is the modern, recommended approach.

**Syntax:**
```javascript
element.addEventListener('eventName', callbackFunction);
```

- `eventName`: The type of event to listen for (e.g., `'click'`, `'mouseover'`).
- `callbackFunction`: The function to execute when the event occurs. This function automatically receives an `event` object as its first argument.

**Example:**
```html
<button id="my-btn">Click Me</button>
```
```javascript
const btn = document.getElementById('my-btn');

function handleClick() {
    alert('Button was clicked!');
}

btn.addEventListener('click', handleClick);
```

---

### 3. Mouse and Pointer Events

These events are triggered by mouse actions or other pointing devices.

- **`click`**: Fires when the user clicks the primary mouse button.
- **`dblclick`**: Fires when the user double-clicks.
- **`mouseover`**: Fires when the mouse pointer enters an element.
- **`mouseout`**: Fires when the mouse pointer leaves an element.
- **`mousemove`**: Fires repeatedly as the mouse pointer moves over an element.

**Example: Mouseover/Mouseout**
```html
<div id="hover-box" style="width: 100px; height: 100px; background-color: lightblue;">
    Hover over me!
</div>
```
```javascript
const box = document.getElementById('hover-box');

box.addEventListener('mouseover', function() {
    box.style.backgroundColor = 'salmon';
    box.textContent = 'You are here!';
});

box.addEventListener('mouseout', function() {
    box.style.backgroundColor = 'lightblue';
    box.textContent = 'Hover over me!';
});
```

---

### 4. The `this` Keyword in Event Listeners

Inside an event listener callback function (that is not an arrow function), the `this` keyword refers to the **element that the event listener is attached to**.

**Example:**
```html
<button class="color-btn">Red</button>
<button class="color-btn">Green</button>
```
```javascript
const buttons = document.querySelectorAll('.color-btn');

function changeColor() {
    // 'this' refers to the button that was clicked
    const color = this.textContent.toLowerCase();
    document.body.style.backgroundColor = color;
    console.log(this); // Logs the button element
}

buttons.forEach(btn => {
    btn.addEventListener('click', changeColor);
});
```
**Note:** If you use an arrow function for the callback, `this` will not refer to the element. It will retain its value from the surrounding (lexical) scope.

---

### 5. Keyboard Events

These events are fired in response to keyboard actions.

- **`keydown`**: Fires when a key is pressed down.
- **`keyup`**: Fires when a key is released.
- **`keypress`**: Fires when a key that produces a character value is pressed down (deprecated, but good to know).

The `event` object for keyboard events contains useful properties like `key` and `code`.

**Example: Listening for the 'Enter' key**
```html
<input type="text" id="my-input" placeholder="Type something and press Enter">
```
```javascript
const input = document.getElementById('my-input');

input.addEventListener('keydown', function(event) {
    // The 'event' object contains details about the event
    if (event.key === 'Enter') {
        alert(`You typed: ${input.value}`);
    }
});
```

---

### 6. Form Events

These are essential for handling user input in forms.

- **`submit`**: Fires on the `<form>` element when it is submitted (e.g., by clicking a `type="submit"` button or pressing Enter).
- **`change`**: Fires when the value of an element like `<input>`, `<select>`, or `<textarea>` has been changed (and the element loses focus).
- **`input`**: Fires instantly whenever the value of an `<input>` or `<textarea>` changes.

#### a. Handling Form Submission and Extracting Data

When a form is submitted, the default browser action is to refresh the page. You can prevent this using `event.preventDefault()`.

**Example:**
```html
<form id="my-form">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Register</button>
</form>
<div id="output"></div>
```
```javascript
const form = document.getElementById('my-form');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', function(event) {
    // 1. Prevent the default form submission (page refresh)
    event.preventDefault();

    // 2. Extracting Form Data
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    // You can also use FormData
    // const formData = new FormData(form);
    // const username = formData.get('username');

    // 3. Use the data
    outputDiv.textContent = `Welcome, ${username}!`;

    // 4. Optionally, clear the form
    form.reset();
});
```

#### b. The `change` and `input` Events

The `input` event is great for real-time feedback.

**Example: Real-time input feedback**
```html
<input type="text" id="feedback-input" placeholder="Type here...">
<p>You are typing: <span id="feedback-output"></span></p>
```
```javascript
const feedbackInput = document.getElementById('feedback-input');
const feedbackOutput = document.getElementById('feedback-output');

feedbackInput.addEventListener('input', function() {
    feedbackOutput.textContent = feedbackInput.value;
});
```

---

### 7. More Common Events

- **`focus`**: An element gets focus (e.g., clicking on an input field).
- **`blur`**: An element loses focus.
- **`scroll`**: The document or an element is scrolled.
- **`load`**: The browser has finished loading the page and all its resources (images, scripts). Usually used on the `window` object.

**Example: Scroll Event**
```javascript
window.addEventListener('scroll', function() {
    console.log(`Scrolled to: ${window.scrollY}px`);
});
```
This is often used for effects like "back to top" buttons or infinite scrolling.
