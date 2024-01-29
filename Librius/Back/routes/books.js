var express = require('express')
var router = express.Router()
var passport = require('./config/config')
var apiCalls = require('../services/apiCalls')

router.get('/',
    async (req, res) => {
        var books = await apiCalls.getPopularBooks()
        console.log(books);
        res.send(books);
})

router.get('/:page/:genre/:searchKeyword?/:searchFlag?',   
    async (req, res) => {
        var page = await apiCalls.getBooksPage(req.params.page,req.params.genre, req.params.searchKeyword , req.params.searchFlag)
        res.send(page)
})


router.get('/:bookID', 
    async (req, res) =>{
        var book = await apiCalls.getSingleBook(req.params.bookID)
        res.send(book)
})




module.exports = router
