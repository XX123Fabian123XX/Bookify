const validatePassword = require("./validateUserPassword")
const BaseError = require("../../utils/baseError");
const buildLoginUser = (dbUserConnection) => {
    return async (userData) => {
        const currentUser = await dbUserConnection.getSingleUserByEmail(userData.email, "+password");
        const passwordIsValid = await validatePassword(currentUser.password, userData.password);

        if (!passwordIsValid) throw new BaseError("The password is invalid")

        return currentUser;
    }
}

module.exports = buildLoginUser;