const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const {getJsonWebToken} = require("../auth/token");

const buildUpdateUserPassword = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {
        console.log(req.body);
        const updatedUser = await userUseCases.updateUserPassword(req.body);

        const jsonWebToken = await getJsonWebToken({id:updatedUser.id})

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