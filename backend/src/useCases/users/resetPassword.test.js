const db = require("../../../__test__/__fixtures__/db");
const makeFakeUser = require("../../../__test__/__fixtures__/user");
const buildUserUseCases = require("./index");
const buildUserDatabaseConnection = require("../../adapters/data-access/users/user-db");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");
const getUserInformation = require("../../utils/getUserInformation")

describe("reset password", () => {

    let userUseCases;
    let user;
    beforeAll(async() => {
        user = await addUserToDatabase();
        userUseCases = buildUserUseCases(buildUserDatabaseConnection(db));
    })

    afterAll(async() => {
        await db.connection.close();
    })

    it("resets the password", async() => {
        const newPassword = "Test12345:)"
        const newUserData = {...user, id:user._id, password:newPassword, passwordConfirm:newPassword};
        const resetPasswordUser = await userUseCases.resetPassword(newUserData);

        expect({...resetPasswordUser, password:null, passwordLastChanged:null}).toMatchObject({...user, password:null, passwordLastChanged:null})
    })
})