const {makeUser} = require("../../entities/users/index");
const getUserInformation = require("../../utils/getUserInformation")

const buildSignupUser = function(dbConnection) {
    return async function(userInformation) {

        const newUserInformation = getUserInformation(await makeUser(userInformation, createWithPassword=true))
        
        return await dbConnection.createUser(newUserInformation)
    }
}

module.exports = buildSignupUser;
