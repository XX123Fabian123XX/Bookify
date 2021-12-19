const {makeUser} = require("../../entities/users/index");
const getUserInformation = require("../../utils/getUserInformation")

const buildSignupUser = function(dbConnection) {
    return async function(userInformation) {
        const newUserInformation = getUserInformation(await makeUser(userInformation, createWithPassword=true))
        console.log("this is the new user information")
        
        console.log(newUserInformation)
        return await dbConnection.createUser(newUserInformation)
    }
}

module.exports = buildSignupUser;
