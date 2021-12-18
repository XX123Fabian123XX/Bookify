const buildLoginUser = require("./loginUser")
const buildSignupUser = require("./signupUser")

const buildUseCases = (dbConnection) => {
    return {
        signupUser:buildSignupUser(dbConnection),
        loginUser:buildLoginUser(dbConnection)
    }
}

module.exports = buildUseCases