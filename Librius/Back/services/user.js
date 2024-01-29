var userModel = require("../models/user")
var apiCalls = require("./apiCalls")

var addFavoriteBook = async function(bookID, userID){
    const user = await userModel.findById(userID)

    user.favoriteBookIds.push(bookID)
    await user.save()
}

var checkIfAlreadyFavorite = async function(bookID, userID){
    const user = await userModel.findById(userID)

    if(user.favoriteBookIds.includes(bookID))
        return true
   
    return false
}

var getFavoriteBooks = async function(userID){
    const user = await userModel.findById(userID)

    var bookIDs = user.favoriteBookIds
    favBooks = await apiCalls.getFavoriteBooks(bookIDs)

    return favBooks
}

var removeFavoriteBook = async function(userID, bookID){

    const user = await userModel.findById(userID)
    const index = user.favoriteBookIds.indexOf(bookID);

    if (index !== -1) {
        user.favoriteBookIds.splice(index, 1);
        await user.save();
        return true;
    }

    return false
}


module.exports = {
    addFavoriteBook,
    checkIfAlreadyFavorite,
    getFavoriteBooks,
    removeFavoriteBook
}