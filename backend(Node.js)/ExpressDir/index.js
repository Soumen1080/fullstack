const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.listen(port, () => {
  console.log(`hello world `)
})

app.listen(port , () => {
  console.log(`hello world !!!! `)
})
app.use((req , res ) => {
  console.log('request received')
 
})

app.use(port , () => {
  console.log(`hello world !!!! `)
})