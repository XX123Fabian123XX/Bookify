const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")

const buildSignupUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))

    return async(req,res) => {
        return userUseCases.signUpUser(req.body);

    }
}

module.exports = buildSignupUser;