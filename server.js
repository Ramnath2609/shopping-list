const express = require('express')
const items = require('./routes/api/items')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://ramanthdb:ramnath@cluster0-mhiwr.mongodb.net/shopping?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log('db connected')
})

app.use('/api/items', items)

const port = process.env.PORT || 5000

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))
    app.use(expres.static(__dirname + '/client/public'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('listening to port', port)
})