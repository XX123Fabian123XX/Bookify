const buildUpdatePassword = require("./updateUserPassword")
const buildLoginUser = require("./loginUser");
const buildSignupUser = require("./signupUser")

const buildUserController = (db) => {
    return {
        signupUser: buildSignupUser(db),
        loginUser: buildLoginUser(db),
        updateUserPassword:buildUpdatePassword(db)
    }
}

module.exports = buildUserController;