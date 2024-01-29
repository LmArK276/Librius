var UserModel = require("../models/user")

var register = function(email, name, password)
{
    return UserModel.register(email, name, password);
}

var getUserDataById = async function(userID)
{
    userData = await UserModel.getData(userID)
    return userData
}

module.exports = {
    register,
    getUserDataById
}