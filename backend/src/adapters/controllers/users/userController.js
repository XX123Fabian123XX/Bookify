const buildUpdatePassword = require("./updateUserPassword")
const buildLoginUser = require("./loginUser");
const buildSignupUser = require("./signupUser");
const buildUpdateMe = require("./updateMe");
const buildForgotPassword = require("./forgotPassword");
const buildResetPassword = require("./resetPassword")
const buildGetMe = require("./getMe")

const buildUserController = (db) => {
    return {
        signupUser: buildSignupUser(db),
        loginUser: buildLoginUser(db),
        updateUserPassword:buildUpdatePassword(db),
        updateMe:buildUpdateMe(db),
        forgotPassword:buildForgotPassword(db),
        resetPassword:buildResetPassword(db),
        getMe:buildGetMe()
    }
}

module.exports = buildUserController;