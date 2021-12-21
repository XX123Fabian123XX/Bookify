const dbConnection = require("../../data-access/users/user-db")
const crypto = require("crypto")
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({path:path.join(__dirname, "../../../../.env")})
const Email = require("../../../utils/email");
const AppError = require("../errors/appError");

const buildForgotPassword = (mongooseObject) => {
    const userDB = dbConnection(mongooseObject);
    return async (req,res) => {

        if (!req.body.email) throw new AppError("Please provide an email", 400);

        const email = req.body.email;
        // get the user and make sure the user exists   
        const user = await userDB.getSingleUserByEmail(email);

        // generate a random token
        const randomToken = crypto.randomBytes(64).toString("hex")

        // set the random taken on the user
        const passwordResetExpires = new Date().getTime() + parseInt(process.env.PASSWORD_RESET_EXPIRES_IN_MILLISECONDS)

        const updatedUser = await userDB.updateUser(user._id, {passwordResetToken:randomToken, passwordResetExpires })
        // send the token via email
        // creating new email object
        
        new Email().sendEmail(updatedUser.email, "Password Reset Token", `This is your token to reset your password ${randomToken}`)

        return {
            status:200,
            message:"success",
            body: {
                data:"Token has been sent via email"
            }
        }

    }
}

module.exports = buildForgotPassword;