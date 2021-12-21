const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token");
const AppError = require("../errors/appError");

const buildUpdateUserPassword = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {

        if (!req.body.oldPassword) throw new AppError("Please provide your old password", 400);
        if (!req.body.newPassword)  throw new AppError("Please provide your new password", 400);
        if (!req.body.passwordConfirm) throw new AppError("Please confirm your new password", 400);

        req.user.id = req.user._id;

        const updatedUser = await userUseCases.updateUserPassword(req.user, req.body);
        console.log(updatedUser)
        const jsonWebToken = await getJsonWebToken({_id:updatedUser._id})
        return {
            status:200,
            message:"success",
            body: {
                data: updatedUser,
                token: jsonWebToken
            }
        }
    }
}

module.exports = buildUpdateUserPassword;