const express = require('express')
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const db = config.get('mongoURI')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log('db connected')
})

app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 5000

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))
    app.use(express.static(__dirname + './client/public'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('listening to port', port)
})