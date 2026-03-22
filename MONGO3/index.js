const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




main().then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/whatsapp');
}


const app = express();

app.get('/', (req, res) => {
  res.send('Root is Working !!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});