const db = require("../../../__test__/__fixtures__/db");
const makeFakeUser = require("../../../__test__/__fixtures__/user");
const buildUserUseCases = require("./index");
const buildUserDatabaseConnection = require("../../adapters/data-access/users/user-db");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");

describe("login user", () => {

    let userUseCases;
    let user;
    let password = "Test1234:)"
    beforeAll(async() => {
        userUseCases = buildUserUseCases(buildUserDatabaseConnection(db));
        user = await addUserToDatabase({password, passwordConfirm:password})
    })

    afterAll(async() => {
        await db.connection.close();
    })

    it("logs a user in ", async() => {
        const loggedInUser = await userUseCases.loginUser({email: user.email, password});
        expect(user).toMatchObject(loggedInUser);
    })

    it("fails to log a user in", async() => {
        return userUseCases.loginUser({email:user.email, password:"Tqb112:)123123"})
        .catch(e => expect(e.message).toBe("The password is invalid"))
    }) 

})