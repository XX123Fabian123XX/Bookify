const db = require("../../../__test__/__fixtures__/db");
const makeFakeUser = require("../../../__test__/__fixtures__/user");
const buildUserUseCases = require("./index");
const buildUserDatabaseConnection = require("../../adapters/data-access/users/user-db");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");
const getUserInformation = require("../../utils/getUserInformation")

describe("update password", () => {

    let user;
    let userUseCases;
    const password = "Test1234:)"
    beforeAll(async() => {
        userUseCases = buildUserUseCases(buildUserDatabaseConnection(db));
        user = await addUserToDatabase({password, passwordConfirm:password});
    })

    afterAll(async() => {
        await db.connection.close();
    })

    it("updates the password", async() => {
        const newPassword = "Test123123:)"
        user.id = user._id;
        
        const updatedPasswordUser = await userUseCases.updateUserPassword(user, {oldPassword:password, newPassword, passwordConfirm:newPassword});

        delete user.id;
        expect(updatedPasswordUser.password).not.toEqual(user.password);
        expect({...updatedPasswordUser, password:null, passwordLastChanged:null}).toMatchObject({...user, password:null, passwordLastChanged:null});
    })
})