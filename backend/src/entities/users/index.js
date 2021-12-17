const {buildMakeUser} = require("./users");
const {isEmailValid, isPasswordValid, encryptPassword} = require("./utils")
const ID = require("../../utils/id")

exports.makeUser = buildMakeUser(isEmailValid, isPasswordValid, encryptPassword, ID)
