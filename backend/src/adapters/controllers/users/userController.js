const buildLoginUser = require("./loginUser");
const buildSignupUser = require("./signupUser")

const buildUserController = (db) => {
    return {
        signupUser: buildSignupUser(db),
        loginUser: buildLoginUser(db)
    }
}

module.exports = buildUserController;