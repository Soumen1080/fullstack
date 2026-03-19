const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

const User = mongoose.model('User', userSchema);

async function run() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('Connected to MongoDB');

        const newUser = new User({
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        });

        await newUser.save();
        console.log('User saved');

        const users = await User.find({ name: 'John Doe' }).lean();
        console.log('Users found:');
        console.log(JSON.stringify(users, null, 2));

        const updateResult = await User.updateMany(
            { name: 'John Doe' },
            { age: 100 }
        );
        console.log(`Users updated: ${updateResult.modifiedCount}`);
    } catch (err) {
        console.log('Database error:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

run();

module.exports = User;

