const User = require('../../models/User')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')


router.post('/', (req, res)=>{
    console.log(req.body)
    const { email, password } = req.body
    if( !email || !password){
        return res.status('400').json({
            msg: 'Please enter all the fields'
        })
    }

    User.findOne({ email })
        .then(user => {
            if(!user){
                return res.status('400').json({msg: 'User does not exist'})
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status('400').json({ msg: 'Invalid credentials'})

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

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user)
        })
})

module.exports = router