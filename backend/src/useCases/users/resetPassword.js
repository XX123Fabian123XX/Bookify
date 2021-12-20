const {makeUser} = require("../../entities/users/index");
const getUserInformation = require("../../utils/getUserInformation")


const buildResetPassword = function(dbConnection) {
    return async function(userInformation) {
        const newUserInformation = getUserInformation(await makeUser(userInformation, createWithPassword=true))
        return await dbConnection.resetPassword(newUserInformation.id, newUserInformation.password)
    }
}

module.exports = buildResetPassword;
