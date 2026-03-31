const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const app = express();
const methodOverride = require('method-override');
//==================================================================


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files like css, js, images from the public folder
app.use(express.urlencoded({extended: true})); // to parse the form data sent from the client side in the request body
app.use(methodOverride('_method')); // to use the method override middleware to override the HTTP method of the request based on the value of the _method query parameter in the request URL
//==================================================================  


main().then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}
//==================================================================
//Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  console.log(chats);
  //res.send(working);   why is i use this line then it is not working because we can not send two response in one route handler so we have to use only one response either res.send() or res.render() but not both
  res.render('index.ejs', { chats: chats });
});
//==================================================================
//New chat route
app.get("/chats/new", (req, res) => {
  res.render('new.ejs');
});

//==================================================================
//Create chat route
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    createdAt: new Date(),
  });
  await newChat.save().then(() => console.log('Chat created successfully!'))
  .catch(err => console.log(err));

  res.redirect("/chats");
});

//==================================================================
//show route
app.get("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);

  if (!chat) {
    return res.status(404).send('Chat not found');
  }

  res.render('show.ejs', { chat: chat });
});

//==================================================================
//edit route 

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render('edit.ejs', { chat: chat });
});

//==================================================================
//update route
app.put("/chats/:id", async(req, res) => {
  let {id} = req.params;
   let {msg: newChat} = req.body;
   let updateChat = await Chat.findByIdAndUpdate(
    id, 
    {msg: newChat}, // this is for updating the msg field of the chat document with the newChat value sent from the client side in the request body
    {new: true, runValidators: true} // to return updated doc and run schema validators during update
);

  console.log(updateChat);
  res.redirect("/chats");
});

//==================================================================
//delete route
app.delete("/chats/:id", async(req, res) => {
   let {id} = req.params;
   let deleteChat = await Chat.findByIdAndDelete(id);
   console.log(deleteChat);
   res.redirect("/chats");

});



//==================================================================
app.get('/', (req, res) => {
  res.send('Root is Working !!');
});

//=====================================================================






app.listen(8080, () => {
  console.log('Server is running on port 8080');
});