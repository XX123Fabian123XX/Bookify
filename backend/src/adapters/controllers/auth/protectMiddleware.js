const AppError = require("../errors/appError");
const {verifyToken} = require("./token")
const dbUserConnection = require("../../data-access/users/user-db")

const buildProtectMiddleware = (mongooseObject) => {
    const connection = dbUserConnection(mongooseObject);

    return async (req,res,next) => {

        // read the token from the header
        const bearerToken = req.headers["authorization"].split(" ")[1];
        console.log(bearerToken)
    
        // verify the token 
        const tokenPayload = await verifyToken(bearerToken);
    
        // get the user
        console.log(tokenPayload)
        const user = await connection.getSingleUser(tokenPayload.id)
        
        // TODO: chec if the user has changed his password after the token has been issued
        if (user.passwordLastChanged > tokenPayload.iat) {
            throw new AppError("Please login again. The password has been changed recently", 400)
        }

        // put the user on the request obj
        req.user = user;
        
        console.log("this is the user")

        console.log(req.user)

        next();
    }
    
   
}
module.exports = buildProtectMiddleware;