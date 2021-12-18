// TODO: makeUser module.exports machen
const {makeUser} = require("../../entities/users/index")
const getUserInformation = require("../../utils/getUserInformation")

const buildUpdateUser = (dbConnection) => {
    return async (id, userInformation) => {
       const oldUser = await dbConnection.getSingleUser(id);
        const newUser = await makeUser({...oldUser, ...userInformation});

        const updatedUser = await dbConnection.updateUser(id, getUserInformation(newUser));
        console.log("this is the updated User")
        console.log(updatedUser)
        return updatedUser

    }
}

module.exports = buildUpdateUser;