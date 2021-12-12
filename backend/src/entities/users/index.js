const {buildMakeUser} = require("./users");
const {isEmailValid, isPasswordValid, encryptPassword} = require("./utils")

exports.makeUser = buildMakeUser(isEmailValid, isPasswordValid, encryptPassword )
