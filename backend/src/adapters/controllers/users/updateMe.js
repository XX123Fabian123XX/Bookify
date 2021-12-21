const buildUserUseCases = require("../../../useCases/users/index")
const dbConnection = require("../../data-access/users/user-db")
const AppError = require("../errors/appError")

// only for updating email and password
const buildUpdateMe = function(db)  {
    const userUseCases = buildUserUseCases(dbConnection(db))
    return async(req,res) => {

        if (!req.body.name && !req.body.email) throw new AppError("Please provide either a name or an email", 400)

        const updateInformation = {}
        if (req.body.name) updateInformation.name = req.body.name;
        if (req.body.email) updateInformation.email = req.body.email;

        const updatedUser = await userUseCases
        .updateUser(req.user._id,updateInformation);

        return {
            status:200,
            message:"success",
            body: {
                data: updatedUser,
            }
        }
    }
}

module.exports = buildUpdateMe