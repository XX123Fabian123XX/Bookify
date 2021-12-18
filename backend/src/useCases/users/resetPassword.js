const {makeUser} = require("../../entities/users/index");
const getUserInformation = require("../../utils/getUserInformation")


const buildResetPassword = function(dbConnection) {
    return async function(userInformation) {
        console.log("das sind die nutzer informationen  ")
        console.log(userInformation)
        const newUserInformation = getUserInformation(await makeUser(userInformation, createWithPassword=true))
        return await dbConnection.updateUser(newUserInformation.id, newUserInformation)
    }
}

module.exports = buildResetPassword;
