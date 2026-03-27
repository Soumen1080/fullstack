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
        to : "srizzu",   
        msg : "Hello Srizzu! How are you?",
        createdAt : new Date(),// WHY USE NEW DATE() HERE? BECAUSE IT WILL SAVE THE TIME ACCORDING TO UTC
    },
    {
        from : "srizzu",
        to : "soumen",   
        msg : "Hello Soumen! I am fine. How are you?",
        createdAt : new Date(),
    },
]


let chat1 = new Chat({
  from : 'Alice',
  to : 'Bob',
  msg : 'Hello Bob! How are you?',
  createdAt : new Date(), // time save according to UTC

});
chat1.save().then(() => console.log('Chat saved successfully!'))
.catch(err => console.log(err));



Chat.insertMany(allChats).then(() => console.log('All chats saved successfully!'))
.catch(err => console.log(err));

