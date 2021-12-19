const dbConnection = require("../../data-access/users/user-db")
const crypto = require("crypto")
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({path:path.join(__dirname, "../../../../.env")})
const Email = require("../../../utils/email");

const buildForgotPassword = (mongooseObject) => {
    const userDB = dbConnection(mongooseObject);
    return async (req,res) => {
        const email = req.body.email;
        //TODO: DECIDE IF GOING DIRECTLY TO THE DB CONNECTION IS THE RIGHT WAY
        // get the user and make sure the user exists   
        const user = await userDB.getSingleUserByEmail(email);

        // generate a random token
        // TODO: THE TOKEN IS NOT RANDOM
        const randomToken = crypto.createHash("sha256").digest("base64")

        // set the random taken on the user
        const passwordResetExpires = new Date().getTime() + parseInt(process.env.PASSWORD_RESET_EXPIRES_IN_MILLISECONDS)
        console.log(new Date(passwordResetExpires))
        const updatedUser= await userDB.updateUser(user.id, {passwordResetToken:randomToken, passwordResetExpires })
        console.log(updatedUser)
        // send the token via email
        // creating new email object
        
        new Email().sendEmail(updatedUser.email, "Password Reset Token", randomToken)

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