const verifyPassword = require("./validateUserPassword")
const {makeUser} = require("../../entities/users/index")
const getUserInformation = require("../../utils/getUserInformation")

const buildUpdatePassword = (dbConnection) => {
    return async(user, requestBody) => {
        const currentUser = await dbConnection.getSingleUser(user.id, extraFields="+password");


        // verify current password
        const isPasswordValid = await verifyPassword(currentUser.password, requestBody.oldPassword);
        
        if (!isPasswordValid) throw new Error("You have entered the wrong password")

        // create a new user with the new password
        const newUser = await makeUser({...currentUser, password:requestBody.newPassword, passwordConfirm: requestBody.passwordConfirm}, true)

        // update the user in the database
        const updatedUser = await dbConnection.updateUser(user.id, getUserInformation(newUser))
        
        return updatedUser;
    }
}

module.exports = buildUpdatePassword;