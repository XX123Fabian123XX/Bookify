const {makeUser} = require("../../entities/users/index");

const buildSignupUser = function(dbConnection) {
    return async function(userInformation) {
        console.log("this is the user informations")
        console.log(userInformation)
        const user = await makeUser(userInformation, createWithPassword=true)
        
        console.log("DAS IST DER NEUE USER")
        console.log(user)

        return await dbConnection.createUser({
            id:user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            createdAt: user.getCreatedAt()
        })
    }
}

module.exports = buildSignupUser;
