const db = require("../../../__test__/__fixtures__/db");
const makeFakeUser = require("../../../__test__/__fixtures__/user");
const buildUserUseCases = require("./index");
const buildUserDatabaseConnection = require("../../adapters/data-access/users/user-db");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");
const getUserInformation = require("../../utils/getUserInformation")

describe("signup user", () => {

    let userUseCases;
    beforeAll(async() => {
        userUseCases = buildUserUseCases(buildUserDatabaseConnection(db));
    })

    afterAll(async() => {
        await db.connection.close();
    })

    it("signs a user up", async() => {
        const fakeUser = getUserInformation(await makeFakeUser());
        const signupUser = await userUseCases.signupUser({...fakeUser, password:"Test1234:)", passwordConfirm:"Test1234:)"});
        signupUser.id = signupUser._id;
        expect(signupUser).toMatchObject(fakeUser);

    })
})