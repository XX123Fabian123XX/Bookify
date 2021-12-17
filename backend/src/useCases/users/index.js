const signupUser = require("./signupUser")

const buildUseCases = (dbConnection) => {
    return {
        signupUser:signupUser(dbConnection)
    }
}

module.exports = buildUseCases