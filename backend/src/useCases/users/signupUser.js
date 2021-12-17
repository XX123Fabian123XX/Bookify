const {makeUser} = require("../../entities/users/index");

exports.buildSignupUser = function(dbConnection) {
    return async function(userInformation) {
        const user = await makeUser(...userInformation, createWithPassword=true)
        
        return await dbConnection.signupUser({
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            createdAt: user.getCreatedAt()
        })
    }
}
