const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token")
const AppError = require("../errors/appError")

const buildLoginUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {

        if (!req.body.email) throw new AppError("Please provide an email", 400);
        if (!req.body.password) throw new AppError("Please provide a password", 400);

        const currentUser = await userUseCases.loginUser(req.body);

        const jsonWebToken = await getJsonWebToken({_id:currentUser._id})

        delete currentUser["password"]

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