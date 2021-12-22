const db = require("../../../../__test__/__fixtures__/db");
const makeFakeUser = require("../../../../__test__/__fixtures__/user");
const getUserInformation = require("../../../utils/getUserInformation");
const userDatabaseBuilder = require("./user-db");
describe("user database", () => {
    let userDatabaseConnection;
    beforeAll(async() => {
        userDatabaseConnection = userDatabaseBuilder(db);
    })
    
    afterAll(async() => {
        await db.connection.close();
    })

    it("creates a user and then gets this user", async() => {
        const fakeUser = getUserInformation(await makeFakeUser({}, true));

        const createdUser = await userDatabaseConnection.createUser(fakeUser);
        const createdUserById = await userDatabaseConnection.getSingleUser(fakeUser.id);

        expect(createdUser).toMatchObject(createdUserById);
    })

    it("deletes a user", async() => {
        const fakeUser = getUserInformation(await makeFakeUser({}, true));

        await userDatabaseConnection.createUser(fakeUser);

        await userDatabaseConnection.deleteUser(fakeUser.id);

        return userDatabaseConnection.getSingleUser(fakeUser.id).catch(e => expect(e.message).toBe(`No User was found with this id ${fakeUser.id}`));
    })

    it ("updates a user", async() => {
        const fakeUser = getUserInformation(await makeFakeUser({}, true));

        const createdUser = await userDatabaseConnection.createUser(fakeUser);

        const newFakeUser = getUserInformation(await makeFakeUser());

        const updatedUser = await userDatabaseConnection.updateUser(createdUser._id, newFakeUser);
        delete newFakeUser["id"];
        expect(updatedUser).toMatchObject(newFakeUser);

    })

    it("gets a single user by email", async() => {
        const fakeUser = getUserInformation(await makeFakeUser({}, true));

        const createdUser = await userDatabaseConnection.createUser(fakeUser);

        const singleUserByEmail = await userDatabaseConnection.getSingleUserByEmail(createdUser.email);

        expect(createdUser).toMatchObject(singleUserByEmail);

    })

    it("resets a password", async () => {
        const fakeUser = getUserInformation(await makeFakeUser({}, true));

        const createdUser = await userDatabaseConnection.createUser(fakeUser); 

         await userDatabaseConnection.resetPassword(createdUser._id, "neuesPasswort");
        
        const user = await userDatabaseConnection.getSingleUser(createdUser._id, "+password")

        expect(user.password).toEqual("neuesPasswort");


    })

})