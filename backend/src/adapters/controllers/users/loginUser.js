const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token")

const buildLoginUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {
        const currentUser = await userUseCases.loginUser(req.body);

        const jsonWebToken = await getJsonWebToken({_id:currentUser._id})

        return {
            status:200,
            message:"success",
            
            body: {
                data: currentUser,
                token: jsonWebToken
            }
        }
    }
}

module.exports = buildLoginUser