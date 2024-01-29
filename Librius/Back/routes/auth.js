var authService = require('../services/auth')
var router = require('express').Router()
var jsonwebtoken = require('jsonwebtoken')
var passport = require('./config/config')


router.post('/register', async (req,res)=>{
    try{
        var token = await authService.register(req.body.email, req.body.name, req.body.password);
    }
    catch(err){
        console.log(err)
    }if (!token)
        res.status(503)
    res.send(token)
})

router.post('/login', 
    passport.authenticate('local', {session: false}),
    (req,res)=>{
    
    res.send({
            "token":req.user.generateJwt()
        }
    )
})


router.post('/validate', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
    res.status(200).send(true)
})

router.post("/getUserData",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        tokenDecoded = jsonwebtoken.decode(token)
        userData = await authService.getUserDataById(tokenDecoded._id)
        res.send(userData)
    }
)

module.exports = router;