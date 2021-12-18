const validatePassword = require("./validateUserPassword")

const buildLoginUser = (dbUserConnection) => {
    return async (userData) => {
        console.log(userData)
        const currentUser = await dbUserConnection.getSingleUserByEmail(userData.email);

        // TODO: valiadate that the user has provided a password and an email

        const passwordIsValid = await validatePassword(currentUser.password, userData.password);

        if (!passwordIsValid) throw new Error("The password is invalid")

        return currentUser;
    }
}

module.exports = buildLoginUser;