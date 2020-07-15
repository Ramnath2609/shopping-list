const express = require('express')
const router = express.Router()
const Item = require('../../models/Item')

router.post('/', (req, res)=>{
    const body = req.body
    const item = new Item(body)
    item.save()
        .then(item=>{
            res.json(item)
        })
})

router.get('/', (req, res)=>{
    Item.find()
        .then(items => {
            res.json(items)
        })
})

router.get('/:id', (req, res)=>{
    const id = req.params.id
    Item.findById(id)
        .then(item => {
            res.json(item)
        })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    Item.deleteOne({_id: id})
        .then(()=>{
            res.json({sucess: true})
        })
        .catch(()=>{
            res.status('404').json({error: "not found"})
        })
})

module.exports = router