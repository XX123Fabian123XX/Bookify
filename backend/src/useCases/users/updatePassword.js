const verifyPassword = require("./validateUserPassword")
const {makeUser} = require("../../entities/users/index")
const getUserInformation = require("../../utils/getUserInformation")

const buildUpdatePassword = (dbConnection) => {
    return async(userInformation) => {
        const currentUser = await dbConnection.getSingleUserByEmail(userInformation.email);

        // verify current password
        const isPasswordValid = await verifyPassword(currentUser.password, userInformation.oldPassword);
        
        if (!isPasswordValid) throw new Error("You have entered the wrong password")

        // create a new user with the new password
        const newUser = await makeUser({...currentUser, password:userInformation.newPassword, passwordConfirm: userInformation.passwordConfirm}, true)

        // update the user in the database
        const updatedUser = await dbConnection.updateUser(newUser.getId(), getUserInformation(newUser))
        
        return updatedUser;
    }
}

module.exports = buildUpdatePassword;