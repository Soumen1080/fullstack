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
