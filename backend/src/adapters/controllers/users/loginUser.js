const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token")

const buildLoginUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {
        console.log("currently in controller")
        const currentUser = await userUseCases.loginUser(req.body);

        const jsonWebToken = await getJsonWebToken({id:currentUser.id})

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