const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token");
const AppError = require("../errors/appError");

const buildSignupUser = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {
        if (!req.body.name) throw new AppError("Please provide a name", 400);
        if (!req.body.email) throw new AppError("Please provide an email", 400);
        if (!req.body.password) throw new AppError("Please provide a password" , 400);
        if (!req.body.passwordConfirm) throw new AppError("Please confirm your password", 400);


        req.body.id = db.Types.ObjectId()

        const newUser = await userUseCases.signupUser(req.body);

        const jsonWebToken = await getJsonWebToken({_id:newUser._id})

        delete newUser["password"];
        delete newUser["passwordLastChanged"]

        return {
            status:201,
            message:"success",
            
            body: {
                data: newUser,
                token: jsonWebToken
            }
        }
    }
}

module.exports = buildSignupUser;