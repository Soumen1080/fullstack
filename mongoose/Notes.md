# Mongoose Notes

This file is a quick reference for learning Mongoose with Node.js.

## 1) What is Mongoose?

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
It helps you:
- Define structure using schemas
- Validate data before saving
- Work with documents using models
- Use built-in methods for CRUD operations

## 2) Basic Setup

Install package:

```bash
npm install mongoose
```

Basic connection:

```js
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('Connected to MongoDB');
}

main().catch((err) => {
  console.log('Connection error:', err);
});
```

## 3) Schema and Model

Schema defines field structure. Model gives methods to interact with MongoDB collection.

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);
```

## 4) Common Mongoose Data Types

Use these types in schema fields:
- `String`
- `Number`
- `Boolean`
- `Date`
- `Buffer`
- `Array`
- `ObjectId` (for references)
- `Mixed` (any type)
- `Decimal128`
- `Map`

Example with options:

```js
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 1, max: 120 },
  isActive: { type: Boolean, default: true },
  joinedAt: { type: Date, default: Date.now },
  score: { type: mongoose.Schema.Types.Decimal128 },
  tags: [String],
  profile: { type: mongoose.Schema.Types.Mixed },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  settings: { type: Map, of: String },
});
```

## 5) Useful Schema Options and Validators

Common field options:
- `required: true`
- `default: value`
- `unique: true` (creates unique index)
- `trim: true` (String)
- `lowercase: true` (String)
- `min`, `max` (Number)
- `enum` (fixed set of values)

Example:

```js
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['book', 'electronics', 'clothing'] },
  inStock: { type: Boolean, default: true },
});
```

## 6) CRUD Functions

### Create

```js
const user = new User({ name: 'John', age: 30, email: 'john@example.com' });
await user.save();

await User.create({ name: 'Jane', age: 25, email: 'jane@example.com' });
```

### Read

```js
const allUsers = await User.find();
const oneUser = await User.findOne({ email: 'john@example.com' });
const byId = await User.findById('64f2a1...');
```

### Update

```js
await User.updateOne({ name: 'John' }, { age: 31 });
await User.updateMany({ isActive: false }, { isActive: true });

const updated = await User.findByIdAndUpdate(
  '64f2a1...',
  { age: 35 },
  { new: true, runValidators: true }
);
```

### Delete

```js
await User.deleteOne({ email: 'john@example.com' });
await User.deleteMany({ isActive: false });
await User.findByIdAndDelete('64f2a1...');
```

## 7) Query Helpers and Operators

Useful methods:
- `find()`
- `findOne()`
- `findById()`
- `sort()`
- `limit()`
- `skip()`
- `select()`

Example:

```js
const result = await User.find({ age: { $gte: 18 } })
  .select('name age email')
  .sort({ age: -1 })
  .limit(5)
  .skip(0);
```

Common MongoDB operators used in Mongoose:
- `$gt`, `$gte`, `$lt`, `$lte`
- `$in`, `$nin`
- `$ne`
- `$and`, `$or`
- `$regex`

## 8) Timestamps

Add `createdAt` and `updatedAt` automatically:

```js
const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
  },
  { timestamps: true }
);
```

## 9) Middleware (Hooks)

Run logic before or after operations.

```js
userSchema.pre('save', function (next) {
  console.log('Before save');
  next();
});

userSchema.post('save', function (doc) {
  console.log('Saved document id:', doc._id);
});
```

## 10) Relationships and Populate

Use `ref` + `populate()` for relation-like behavior.

```js
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
});

const Order = mongoose.model('Order', orderSchema);

const orders = await Order.find().populate('user', 'name email');
```

## 11) Lean Queries

Use `.lean()` when you only need plain JavaScript objects (faster reads).

```js
const users = await User.find().lean();
```

## 12) Error Handling Pattern

```js
try {
  const doc = await User.create({ name: 'A', age: -5 });
  console.log(doc);
} catch (err) {
  console.log('Validation or DB error:', err.message);
}
```

## 13) Your Current File Summary

In your current code:
- You connect to MongoDB correctly.
- You created a schema and model.
- You create a document and save it with `save()`.

Small improvement idea:
- Handle the error object in `catch` for connection too, so you can see exact failure reason.

Example:

```js
main()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB not connected:', err));
```

## 14) Quick Revision Checklist

- Know difference between Schema and Model
- Memorize common data types
- Practice `create`, `find`, `update`, `delete`
- Use validators (`required`, `min`, `enum`)
- Learn `populate()` and `timestamps`
- Use `try/catch` and readable error logs

---

## 15) Definitions of All Mongoose Functions & Components

### Core Components

| Component | Definition |
|-----------|------------|
| `mongoose` | The top-level Mongoose object. Entry point for everything. |
| `Schema` | Blueprint that defines the structure, types, and rules for documents in a collection. |
| `Model` | A class built from a Schema. Provides all methods to interact with a MongoDB collection. |
| `Document` | A single instance of a Model. Represents one record in the collection. |
| `Connection` | The MongoDB connection object. Accessed via `mongoose.connection`. |

---

### Connection Functions

```js
mongoose.connect(uri)
// Connects to MongoDB. Returns a Promise.
// uri example: 'mongodb://127.0.0.1:27017/dbname'

mongoose.connection.close()
// Gracefully closes the MongoDB connection. Returns a Promise.

mongoose.connection.on('connected', callback)
// Fires when connection is established.

mongoose.connection.on('error', callback)
// Fires when a connection error occurs.

mongoose.connection.on('disconnected', callback)
// Fires when connection is lost.
```

---

### Schema Functions

```js
new mongoose.Schema(definition, options)
// Creates a new schema with field definitions and optional settings.
// definition = { fieldName: Type } or { fieldName: { type, validators } }
// options = { timestamps: true, strict: true, ... }

schema.pre(event, callback)
// Middleware that runs BEFORE an event (e.g., 'save', 'find', 'delete').
// Must call next() to continue.

schema.post(event, callback)
// Middleware that runs AFTER an event completes.
// Receives the resulting document as argument.

schema.methods.methodName = function() {}
// Adds a custom instance method to documents of this model.

schema.statics.methodName = function() {}
// Adds a custom static method to the Model itself.

schema.virtual('fieldName')
// Defines a virtual field (not stored in DB, computed on the fly).
```

---

### Model (Static) Functions

These are called on the Model class directly (e.g., `User.find()`):

```js
Model.create(data)
// Creates and saves one or more documents in one step. Returns the saved doc(s).

Model.insertMany([data])
// Inserts multiple documents at once. More efficient than multiple .save() calls.

Model.find(filter)
// Returns ALL documents matching the filter. Empty filter {} returns all docs.

Model.findOne(filter)
// Returns the FIRST document matching the filter.

Model.findById(id)
// Returns one document by its _id field.

Model.updateOne(filter, update)
// Updates the FIRST document matching the filter.

Model.updateMany(filter, update)
// Updates ALL documents matching the filter.

Model.findByIdAndUpdate(id, update, options)
// Finds by _id and updates. Use { new: true } to return the updated document.

Model.findOneAndUpdate(filter, update, options)
// Finds one by filter and updates it.

Model.deleteOne(filter)
// Deletes the FIRST document matching the filter.

Model.deleteMany(filter)
// Deletes ALL documents matching the filter.

Model.findByIdAndDelete(id)
// Finds by _id and deletes the document. Returns the deleted document.

Model.countDocuments(filter)
// Returns the count of documents matching the filter.

Model.exists(filter)
// Returns the _id of one matching document, or null if none exists.
```

---

### Document (Instance) Functions

These are called on a document instance (e.g., `user.save()`):

```js
document.save()
// Saves the document to the database. Runs validators and middleware.

document.remove()  /  document.deleteOne()
// Removes this specific document from the database.

document.toObject()
// Converts the Mongoose document to a plain JavaScript object.

document.toJSON()
// Converts the document to JSON format (used by JSON.stringify).

document.isModified('field')
// Returns true if the specified field has been changed since last save.

document.set('field', value)
// Sets a field value on the document.

document.validate()
// Runs validators on the document without saving. Returns a Promise.
```

---

### Query Chain Functions

These are chained onto queries like `User.find()`:

```js
.select('field1 field2')
// Choose which fields to include (or exclude with '-field').

.sort({ field: 1 })
// Sort results. 1 = ascending (A→Z), -1 = descending (Z→A).

.limit(n)
// Limit results to n documents.

.skip(n)
// Skip the first n documents (used for pagination with .limit()).

.populate('field')
// Replaces an ObjectId reference with the actual document data.
// Use 'field', 'name email' to select specific fields from populated doc.

.lean()
// Returns plain JS objects instead of Mongoose documents. Faster reads.

.exec()
// Executes the query and returns a Promise. Optional but explicit.

.where('field').equals(value)
// Alternative to passing a filter object.
```

---

### Schema Data Types Reference

| Type | Usage |
|------|-------|
| `String` | Text values |
| `Number` | Integer or float |
| `Boolean` | `true` / `false` |
| `Date` | Date and time |
| `Buffer` | Binary data |
| `Array` | List of values e.g. `[String]` |
| `mongoose.Schema.Types.ObjectId` | Reference to another document |
| `mongoose.Schema.Types.Mixed` | Any type (no validation) |
| `mongoose.Schema.Types.Decimal128` | High-precision decimal |
| `Map` | Key-value pairs |

---

### Schema Validators Reference

| Validator | Types | Definition |
|-----------|-------|------------|
| `required: true` | All | Field must be present |
| `default: value` | All | Default value if not provided |
| `unique: true` | All | Creates a unique index |
| `min: n` | Number, Date | Minimum value |
| `max: n` | Number, Date | Maximum value |
| `minlength: n` | String | Minimum string length |
| `maxlength: n` | String | Maximum string length |
| `trim: true` | String | Removes leading/trailing spaces |
| `lowercase: true` | String | Converts to lowercase before saving |
| `uppercase: true` | String | Converts to uppercase before saving |
| `enum: [values]` | String | Value must be one of the listed options |
| `match: /regex/` | String | Value must match the regex pattern |

---

## 16) Operation Buffering in Mongoose

### What is operation buffering?

Mongoose can queue database operations when MongoDB is not connected yet.
This feature is called operation buffering.

### How it works

When you run a query before connecting to MongoDB, Mongoose does this:

You write an operation:

```js
User.find();
```

But MongoDB is not connected yet.

Mongoose does not throw error immediately.
Instead, it buffers (stores) the operation in memory.

Once connection is established:

```js
mongoose.connect('mongodb://127.0.0.1:27017/testdb');
```

All buffered operations are executed automatically.

Example:
- You call `User.find()` before connection is ready.
- Mongoose buffers that query for a short time.
- Once connected, it executes the queued operation.

### Why it is useful

- Helpful during app startup.
- Prevents immediate failure for early queries.

### Common issue

If connection does not become ready in time, you may see:

```txt
MongooseError: Operation `users.find()` buffering timed out after 10000ms
```

This usually means:
- MongoDB server is not running
- Wrong connection URI
- Query executed before successful connection

### How to control buffering

Disable buffering globally (fail fast):

```js
mongoose.set('bufferCommands', false);
```

Set buffer timeout globally:

```js
mongoose.set('bufferTimeoutMS', 5000);
```

Disable buffering for one schema:

```js
const userSchema = new mongoose.Schema(
  { name: String },
  { bufferCommands: false }
);
```

### Best practice

Always await the database connection before running queries.

```js
const mongoose = require('mongoose');

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('DB connected');

  // Safe: query after successful connection
  const users = await User.find();
  console.log(users);
}

start().catch((err) => console.log(err));
```

---

## 17) Model Find Methods in Detail

This section focuses only on read/query methods used on a model (for example, `User`).

### A) `Model.find(filter, projection, options)`

Use `find()` when you want multiple documents.

Syntax:

```js
Model.find(filter, projection, options)
```

- `filter`: Which documents to match.
- `projection`: Which fields to include/exclude.
- `options`: Query options like `sort`, `limit`, `skip`.
- Return value: Array of documents (possibly empty `[]`).

Example:

```js
const users = await User.find(
  { age: { $gte: 18 } },
  'name age email',
  { sort: { age: -1 }, limit: 10 }
);
```

When no document matches, `find()` returns empty array, not `null`.

---

### B) `Model.findOne(filter, projection, options)`

Use `findOne()` when you want only the first matched document.

Syntax:

```js
Model.findOne(filter, projection, options)
```

- Return value: Single document or `null`.
- Useful for unique-like fields such as `email`, `username`.

Example:

```js
const user = await User.findOne({ email: 'john@example.com' });

if (!user) {
  console.log('User not found');
}
```

---

### C) `Model.findById(id, projection, options)`

Use `findById()` when you already have `_id`.

Syntax:

```js
Model.findById(id, projection, options)
```

- Equivalent to `findOne({ _id: id })`.
- Return value: Single document or `null`.

Example:

```js
const user = await User.findById('65e1ab...').select('name email');
```

If id format is invalid, Mongoose may throw a `CastError`.

---

### D) Filtering Deep Dive

You can build filters with MongoDB operators.

```js
const result = await User.find({
  age: { $gte: 18, $lte: 40 },
  isActive: true,
  city: { $in: ['Delhi', 'Mumbai'] },
  name: { $regex: '^a', $options: 'i' },
});
```

Common operators:
- Comparison: `$gt`, `$gte`, `$lt`, `$lte`, `$ne`
- Array/set: `$in`, `$nin`
- Logical: `$and`, `$or`, `$nor`
- Element: `$exists`
- Pattern: `$regex`

---

### E) Projection (Selecting Fields)

Projection controls which fields are returned.

```js
const users = await User.find({}, 'name email');
// includes only name + email (+ _id by default)

const users2 = await User.find({}, '-password -__v');
// excludes password and __v
```

Rules:
- Include style: `'name email'`
- Exclude style: `'-password -__v'`
- Do not mix include and exclude in the same projection (except `_id`).

---

### F) Query Chaining with Find

You can chain helpers after `find()`.

```js
const page = 2;
const pageSize = 5;

const users = await User.find({ isActive: true })
  .select('name age email')
  .sort({ age: -1, name: 1 })
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .lean();
```

Meaning:
- `select()` choose fields
- `sort()` order results
- `skip()` move offset
- `limit()` cap count
- `lean()` return plain objects for faster reads

---

### G) `find()` vs `findOne()` vs `findById()`

| Method | Input | Output | Typical Use |
|--------|-------|--------|-------------|
| `find()` | filter object | array | list many docs |
| `findOne()` | filter object | doc or `null` | first match |
| `findById()` | `_id` value | doc or `null` | lookup by id |

Quick memory line:
- `find()` -> many
- `findOne()` -> first one
- `findById()` -> one by `_id`

---

### H) Counting with Find Filters

Use same filter with `countDocuments()` for pagination.

```js
const filter = { isActive: true };

const total = await User.countDocuments(filter);
const users = await User.find(filter).limit(10).skip(0);
```

This gives both data and total count.

---

### I) Populate with Find

When fields store referenced ObjectIds, use `populate()`.

```js
const orders = await Order.find({ amount: { $gte: 1000 } })
  .populate('user', 'name email')
  .sort({ createdAt: -1 });
```

`populate()` replaces object id with referenced document data.

---

### J) Safe Error Handling for Find Methods

```js
try {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
} catch (err) {
  // Invalid ObjectId often reaches here as CastError
  res.status(400).json({ message: err.message });
}
```

Best practice:
- Check `null` for `findOne()` and `findById()`.
- Check `array.length` for `find()`.
- Use `try/catch` to handle cast and query errors.

---

### K) Interview-Style Questions (Find Methods)

1. What does `find()` return when no data matches?
   - Empty array `[]`.

2. What does `findOne()` return when no data matches?
   - `null`.

3. Is `findById(id)` same as `findOne({ _id: id })`?
   - Yes, conceptually same lookup.

4. Why use `lean()` with `find()`?
   - Better read performance when you only need plain objects.

---

## 18) Schema Validations in Detail

Schema validation is one of the most important parts of Mongoose.
It ensures only valid and clean data enters your database.

Think of validation as a gate:
- Input document comes in.
- Mongoose checks it against schema rules.
- If all rules pass, document is saved.
- If any rule fails, Mongoose throws a validation error.

---

### A) When Validation Runs

Validation runs automatically on:
- `doc.save()`
- `Model.create()`
- `insertMany()` (by default validation runs, but behavior differs by options)

Validation does NOT run automatically on update methods unless you enable it.

For update operations, use:

```js
await User.findByIdAndUpdate(id, updateData, {
  new: true,
  runValidators: true,
});
```

Without `runValidators: true`, invalid update values may be written.

---

### B) Core Built-in Validators

#### 1) `required`

Makes a field mandatory.

```js
name: { type: String, required: true }
```

You can provide custom error message:

```js
name: { type: String, required: [true, 'Name is required'] }
```

#### 2) Number validators: `min`, `max`

```js
age: { type: Number, min: [18, 'Age must be at least 18'], max: 65 }
```

#### 3) String length validators: `minlength`, `maxlength`

```js
username: {
  type: String,
  minlength: [3, 'Username too short'],
  maxlength: [20, 'Username too long'],
}
```

#### 4) `enum`

Allows only specific values.

```js
role: {
  type: String,
  enum: {
    values: ['student', 'teacher', 'admin'],
    message: 'Role is invalid',
  },
}
```

#### 5) `match` (Regex)

Useful for format checks like email/phone.

```js
email: {
  type: String,
  match: [/^\S+@\S+\.\S+$/, 'Email format is invalid'],
}
```

---

### C) Useful Field Options That Improve Data Quality

These are not always validators, but they help keep data consistent:

- `trim: true` -> removes leading/trailing spaces.
- `lowercase: true` -> converts string to lowercase before save.
- `uppercase: true` -> converts string to uppercase before save.
- `default` -> sets fallback value if not provided.

Example:

```js
email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
}
```

---

### D) Custom Validators

Use custom validation when built-in validators are not enough.

#### 1) Synchronous custom validator

```js
username: {
  type: String,
  validate: {
    validator: function (value) {
      return !value.includes(' ');
    },
    message: 'Username must not contain spaces',
  },
}
```

#### 2) Asynchronous custom validator

Useful when validation needs DB check or async logic.

```js
email: {
  type: String,
  validate: {
    validator: async function (value) {
      const existing = await this.constructor.findOne({ email: value });
      if (!this.isNew && this.email === value) return true;
      return !existing;
    },
    message: 'Email already exists',
  },
}
```

Note:
- If async validator returns `false`, validation fails.
- If async validator throws, it is also treated as validation failure.

---

### E) `unique` is NOT a Validator

Important interview point:

`unique: true` creates a MongoDB unique index.
It is not a Mongoose validator.

So duplicate value errors often come from MongoDB index errors (e.g. E11000), not ValidationError.

Example:

```js
email: { type: String, unique: true }
```

Best practice:
- Keep `unique: true` for uniqueness at DB level.
- Also handle duplicate key error in `catch` block.

---

### F) Validation on Nested Fields and Arrays

#### Nested object validation

```js
profile: {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}
```

#### Array element validation

```js
tags: [{ type: String, minlength: 2 }]
```

Each element in `tags` is validated separately.

#### Subdocument schema validation

```js
const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  pin: { type: Number, min: 100000, max: 999999 },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: addressSchema, required: true },
});
```

---

### G) Update Validators: Important Rules

When using update methods with `runValidators: true`:
- Validators run only on updated paths.
- Some operators have special behavior.
- `required` only fails if you explicitly unset/set invalidly in update context.

Recommended pattern:

```js
await User.updateOne(
  { _id: id },
  { $set: { age: 15 } },
  { runValidators: true }
);
```

For `findOneAndUpdate`, also consider:

```js
{ runValidators: true, new: true, context: 'query' }
```

`context: 'query'` helps in some custom validator cases that depend on query context.

---

### H) Manual Validation Without Saving

You can validate before save:

```js
const user = new User({ name: 'A', age: 8 });
await user.validate(); // throws ValidationError if invalid
```

Useful when you want to check data early in service/controller layer.

---

### I) Reading Validation Errors Properly

Mongoose validation failure throws `ValidationError`.

You can inspect field-level errors:

```js
try {
  await User.create({ name: '', age: 10 });
} catch (err) {
  if (err.name === 'ValidationError') {
    for (const field in err.errors) {
      console.log(field, err.errors[field].message);
    }
  }
}
```

Common error types inside `err.errors[field]`:
- `ValidatorError` (rule failed)
- `CastError` (wrong type cast, e.g. string in number field)

---

### J) Global SchemaType Validation (Advanced)

You can define a global validator for a schema type.

Example idea:
- Apply a generic rule for all strings in your app.

This is advanced and usually used in larger apps with strict standards.

---

### K) Full Practical Schema Example (Validation-Focused)

```js
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [40, 'Name cannot exceed 40 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, 'Minimum age is 18'],
      max: [60, 'Maximum age is 60'],
    },
    role: {
      type: String,
      enum: ['student', 'mentor'],
      default: 'student',
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters'],
      validate: {
        validator: function (value) {
          return /[A-Z]/.test(value) && /[0-9]/.test(value);
        },
        message: 'Password must include at least 1 uppercase letter and 1 digit',
      },
    },
  },
  { timestamps: true }
);
```

---

### L) Best Practices for Schema Validations

1. Validate at schema level first, then add business checks in service layer.
2. Always set custom error messages for better API responses.
3. Use `runValidators: true` in update operations.
4. Treat `unique` as DB index rule, and separately catch duplicate key errors.
5. Keep validation strict but practical (avoid over-validating harmless fields).
6. Use reusable helper functions for regex and custom validator logic.
7. For APIs, convert Mongoose errors to clean user-friendly JSON messages.

---

### M) Interview Quick Q&A (Schema Validation)

1. Is `unique: true` a validator in Mongoose?
   - No, it creates a MongoDB unique index.

2. How do you run validation on update methods?
   - Pass `{ runValidators: true }` in update options.

3. Which error is thrown when validation fails?
   - `ValidationError`.

4. Can custom validators be async?
   - Yes.

5. Difference between `required` and `default`?
   - `required` enforces presence.
   - `default` fills value when missing.

5. Can you paginate without `skip()`?
   - Yes, with cursor-based pagination, but `skip/limit` is easiest for beginners.

---

## 18) List of Different Model Find Methods

Use this as a quick revision list.

| Method | Purpose | Returns |
|--------|---------|---------|
| `Model.find(filter)` | Find all matching documents | Array of docs (`[]` if none) |
| `Model.findOne(filter)` | Find first matching document | One doc or `null` |
| `Model.findById(id)` | Find one document by `_id` | One doc or `null` |
| `Model.find().where('age').gt(18)` | Find using chained query builder | Array of docs |
| `Model.find().select('name email')` | Find with selected fields only | Array of docs |
| `Model.find().sort({ age: -1 })` | Find with sorting | Array of docs |
| `Model.find().skip(n).limit(m)` | Find with pagination | Array of docs |
| `Model.find().lean()` | Find as plain JS objects (faster read) | Array of plain objects |
| `Model.findOne().lean()` | Find one as plain JS object | Plain object or `null` |
| `Model.findById(id).populate('user')` | Find by id and load referenced docs | One populated doc or `null` |
| `Model.findOneAndUpdate(filter, update, options)` | Find one and update in one step | Old/new doc or `null` |
| `Model.findByIdAndUpdate(id, update, options)` | Find by id and update | Old/new doc or `null` |
| `Model.findOneAndDelete(filter)` | Find one and delete | Deleted doc or `null` |
| `Model.findByIdAndDelete(id)` | Find by id and delete | Deleted doc or `null` |

### Mini Note

- `find` methods that return many docs give an array.
- `findOne` / `findById` style methods return one doc or `null`.
- Use `{ new: true }` in update variants to get the updated document.
