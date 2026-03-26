const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const app = express();




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


main().then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}
//Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  console.log(chats);
  res.send(working);
});




let chat1 = new Chat({
  from : 'Alice',
  to : 'Bob',
  msg : 'Hello Bob! How are you?',
  createdAt : new Date(), // time save according to UTC

});
chat1.save().then(() => console.log('Chat saved successfully!'))
.catch(err => console.log(err));









app.get('/', (req, res) => {
  res.send('Root is Working !!');
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

