var express = require('express')
var router = express.Router()
var userService = require('../services/user')
var passport = require('./config/config')
var jsonwebtoken = require('jsonwebtoken')

router.post(
    "/addFavorite", 
    passport.authenticate('jwt', {session:false}), 
    async (req,res) => {
        const token = req.headers.authorization.split(' ')[1]
        tokenDecoded = jsonwebtoken.decode(token)
        await userService.addFavoriteBook(req.body.bookID, tokenDecoded._id)
        res.status(200)
        res.send({message:"Fav book added"})
    }
)

router.post(
    "/checkFavorite",
    passport.authenticate('jwt',{session:false}),
    async (req, res) =>{
        const token = req.headers.authorization.split(' ')[1]
        tokenDecoded = jsonwebtoken.decode(token)
        check = await userService.checkIfAlreadyFavorite(req.body.bookID, tokenDecoded._id)
        res.send(check)
    }
)

router.post(
    "/getFavorites",
    passport.authorize('jwt', {session:false}),
    async(req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        tokenDecoded = jsonwebtoken.decode(token)

        favBooks = await userService.getFavoriteBooks(tokenDecoded._id)

        res.send(favBooks)
    }
)

router.post(
    "/removeFavorite",
    passport.authorize('jwt', {session:false}),
    async(req,res) =>{
        const token = req.headers.authorization.split(' ')[1]
        tokenDecoded = jsonwebtoken.decode(token)

        result = await userService.removeFavoriteBook(tokenDecoded._id, req.body.bookID)

        res.send({result: result})
    }
)

module.exports = router