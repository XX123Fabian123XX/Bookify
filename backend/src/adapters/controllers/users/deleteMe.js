const userDatabaseConnection = require("../../data-access/users/user-db");

const buildDeleteMe = (mongooseObject) => {
    const dbConnection = userDatabaseConnection(mongooseObject)

    return async(req) => {
        await dbConnection.deleteUser(req.user._id);

        return {
            message:"success",
            status:204,
            body: {
                data:null
            }
        }
    }
}

module.exports = buildDeleteMe;