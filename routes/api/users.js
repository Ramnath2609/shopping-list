const User = require('../../models/User')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')


router.post('/register', (req, res)=>{
    const { username, email, password } = req.body
    if(!username || !email || !password){
        return res.status('400').json({
            msg: 'Please enter all the fields'
        })
    }

    User.findOne({ email })
        .then(user => {
            if(user){
                return res.status('400').json({msg: 'User alredy exists'})
            }
            const newUser = new User({
                username,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user._id }, 
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        user: {
                                            id: user._id,
                                            username: user.username,
                                            email: user.email
                                        },
                                        token                   
                                    })
                                }
                            )                            
                        })
                })
            })
       })

})

module.exports = router