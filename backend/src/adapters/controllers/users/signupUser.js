const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token");

const buildSignupUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {

        req.body.id = db.Types.ObjectId()

        const newUser = await userUseCases.signupUser(req.body);

        const jsonWebToken = await getJsonWebToken({id:newUser.id})

        return {
            status:200,
            message:"success",
            
            body: {
                data: newUser,
                token: jsonWebToken
            }
        }
    }
}

module.exports = buildSignupUser;