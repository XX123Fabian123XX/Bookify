const AppError = require("../errors/appError");
const {verifyToken} = require("./token")
const dbUserConnection = require("../../data-access/users/user-db")

const buildProtectMiddleware = (mongooseObject) => {
    const connection = dbUserConnection(mongooseObject);

    return async (req,res,next) => {

        if(!req.headers["authorization"]) throw new AppError("Please provide an authentication token", 401)

        // read the token from the header
        const bearerToken = req.headers["authorization"].split(" ")[1];
        console.log(bearerToken)
    
        // verify the token 
        const tokenPayload = await verifyToken(bearerToken);
    
        // get the user
        console.log(tokenPayload)
        const user = await connection.getSingleUser(tokenPayload.id)
        
        // check if the password has recently been updated
        if (Math.floor(user.passwordLastChanged / 1000) > tokenPayload.iat) {
            throw new AppError("Please login again. The password has been changed recently", 400)
        }

        // put the user on the request obj
        req.user = user;
    
        next();
    }
}
module.exports = buildProtectMiddleware;