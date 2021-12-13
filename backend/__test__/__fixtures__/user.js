const faker = require("faker");
const {makeUser} = require("../../src/entities/users/index");

const makeFakeUser = async (userInformation,createWithPassword = false) => {
        let userFakeData = {}
        userFakeData["name"] = `${faker.name.firstName()} ${faker.name.lastName}`
        userFakeData["email"] = faker.internet.email()
        
        if (createWithPassword) {
            const password = faker.internet.password()
            userFakeData["password"] = password;
            userFakeData["passwordConfirm"] = password;
        }

        userFakeData = {...userFakeData, ...userInformation};

        return await makeUser(userFakeData)
    }


module.exports = makeFakeUser;
