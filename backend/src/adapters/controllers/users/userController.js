const signupUser = require("./signupUser")

const buildUserController = (db) => {
    return {
        signupUser: signupUser(db)
    }
}

module.exports = buildUserController;