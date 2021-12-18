const buildUpdateUser = require("./updateUser")
const buildLoginUser = require("./loginUser")
const buildSignupUser = require("./signupUser");
const buildUpdateUserPassword = require("./updatePassword");
const buildResetPassword = require("./resetPassword");

const buildUseCases = (dbConnection) => {
    return {
        signupUser:buildSignupUser(dbConnection),
        loginUser:buildLoginUser(dbConnection),
        updateUserPassword: buildUpdateUserPassword(dbConnection),
        updateUser: buildUpdateUser(dbConnection),
        resetPassword: buildResetPassword(dbConnection)
    }
}

module.exports = buildUseCases