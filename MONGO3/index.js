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
  //res.send(working);   why is i use this line then it is not working because we can not send two response in one route handler so we have to use only one response either res.send() or res.render() but not both
  res.render('index.ejs', { chats: chats });
});









app.get('/', (req, res) => {
  res.send('Root is Working !!');
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

