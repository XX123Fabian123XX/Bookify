const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token");

const buildSignupUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))

    return async(req,res) => {
        const newUser =  userUseCases.signUpUser(req.body);

        return {
            status:200,
            message:"success",
            
            body: {
                data: newUser,
                token:getJsonWebToken({id:newUser.id}),
            }
        }
    }
}

module.exports = buildSignupUser;