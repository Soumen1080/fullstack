
const mongoose = require('mongoose');
main() 
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB not connect'));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com'
});
newUser.save()
.then(() => console.log('User saved'))
.catch(err => console.log('Error saving user:', err));