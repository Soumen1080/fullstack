const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice_db')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Connection error:', err));

// 1. Create a Schema with Validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: [3, 'Username must be at least 3 characters long'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'],
    max: [100, 'Age cannot exceed 100']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// 2. Add an Mongoose Middleware (Hook) for Deletion
// This runs before document is deleted using findOneAndDelete / findByIdAndDelete
userSchema.pre('findOneAndDelete', async function(next) {
  console.log('Middleware: About to delete a user document...');
  // You can perform cascade deletes here, like deleting user's posts
  // const docToDelete = await this.model.findOne(this.getQuery());
  // await Post.deleteMany({ author: docToDelete._id });
  next();
});

const User = mongoose.model('User', userSchema);

// 3. Main function to demonstrate Validation and Deletion
async function runOperations() {
  try {
    // --- VALIDATION SCENARIOS ---
    
    console.log('\n--- 1. Testing Validation (Intentional Error) ---');
    try {
      const invalidUser = new User({
        username: 'ab', // Fails minLength
        email: 'invalid-email', // Fails match
        age: 15 // Fails min
      });
      await invalidUser.save();
    } catch (err) {
      console.log('Validation caught the errors properly:');
      for (let field in err.errors) {
        console.log(`- ${field}: ${err.errors[field].message}`);
      }
    }

    console.log('\n--- 2. Creating a Valid User ---');
    const validUser = new User({
      username: 'john_doe',
      email: 'john@example.com',
      age: 25
    });
    
    const savedUser = await validUser.save();
    console.log('Successfully saved user:', savedUser);

    // --- DELETION SCENARIOS ---

    console.log('\n--- 3. Deleting the User ---');
    // Using findByIdAndDelete triggers the 'findOneAndDelete' hook
    const deletedUser = await User.findByIdAndDelete(savedUser._id);
    
    if (deletedUser) {
      console.log('Successfully deleted user:', deletedUser.username);
    } else {
      console.log('User not found for deletion.');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Execute the operations
runOperations();
