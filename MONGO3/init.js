const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


main().then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}



let allChats = [
    {
        from : "soumen",
        to : "sriza",   
        msg : "Hello Sriza! How are you?",
        createdAt : new Date(),// WHY USE NEW DATE() HERE? BECAUSE IT WILL SAVE THE TIME ACCORDING TO UTC
    },
    {
        from : "sriza",
        to : "soumen",   
        msg : "Hello Soumen! I am fine. How are you?",
        createdAt : new Date(),
    },
]




Chat.insertMany(allChats).then(() => console.log('All chats saved successfully!'))
.catch(err => console.log(err));