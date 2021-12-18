const buildUpdatePassword = require("./updateUserPassword")
const buildLoginUser = require("./loginUser");
const buildSignupUser = require("./signupUser");
const buildUpdateMe = require("./updateMe");
const buildForgotPassword = require("./forgotPassword");

const buildUserController = (db) => {
    return {
        signupUser: buildSignupUser(db),
        loginUser: buildLoginUser(db),
        updateUserPassword:buildUpdatePassword(db),
        updateMe:buildUpdateMe(db),
        forgotPassword:buildForgotPassword(db)
    }
}

module.exports = buildUserController;