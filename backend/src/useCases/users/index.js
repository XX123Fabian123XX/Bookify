const buildLoginUser = require("./loginUser")
const buildSignupUser = require("./signupUser")
const buildUpdateUserPassword = require("./updatePassword");

const buildUseCases = (dbConnection) => {
    return {
        signupUser:buildSignupUser(dbConnection),
        loginUser:buildLoginUser(dbConnection),
        updateUserPassword: buildUpdateUserPassword(dbConnection)
    }
}

module.exports = buildUseCases