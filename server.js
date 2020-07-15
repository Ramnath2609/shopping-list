const express = require('express')
const items = require('./routes/api/items')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/shopping-list',{useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log('db connected')
})

app.use('/api/items', items)

const port = process.env.PORT || 5000



app.listen(port, () => {
    console.log('listening to port', port)
})