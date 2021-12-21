const databaseConnection = require("../../data-access/users/user-db");
const AppError = require("../errors/appError");
const buildUseCases = require("../../../useCases/users/index");

const buildResetPassword = (mongooseObject) => {
    const userDatabaseConnection = databaseConnection(mongooseObject);
    const userUseCases = buildUseCases(userDatabaseConnection);

    return async(req,res) => {
        // 1) verify the token and that it has not expired
        if (!req.body.token) throw new AppError("Please provide a reset token", 400);
        if (!req.body.password) throw new AppError("Please provide a password", 400);
        if (!req.body.passwordConfirm) throw new AppError("Please confirm your password", 400)

        const token = req.body.token;
        const user = await userDatabaseConnection.getSingleUserByToken(token);
        user.id = user._id;

        if (new Date().getTime() > user.passwordResetExpires) throw new AppError("The token has expired. Please get a new token", 400);
        // 2) create the new user with new password
        const newUser = await userUseCases.resetPassword({...user, password:req.body.password, passwordConfirm: req.body.passwordConfirm})
        
        // 3) return a response
        return {
            status:200,
            message:"success",
            body: {
                data: newUser
            }
        }
    }
}

module.exports = buildResetPassword; 