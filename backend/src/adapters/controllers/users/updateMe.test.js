const db = require("../../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");
const makeFakeUser = require("../../../../__test__/__fixtures__/user");
const getUserInformation = require("../../../utils/getUserInformation");
const buildUserController = require("./userController");

describe("update me", () => {
    let user
    let userController;
    beforeAll(async() => {
        user = await addUserToDatabase();
        userController = buildUserController(db);
    })

    afterAll(() => {
        db.connection.close();
    })

    it("updates me", async() => {
        const fakeUser = getUserInformation(await makeFakeUser())
        user.id = user._id;
        const response = await userController.updateMe({body:{
            name:fakeUser.name,
            email:fakeUser.email
        }, user})

        expect(response.status).toBe(200);
        expect(response.message).toBe("success")
        expect(response.body.data.name).toBe(fakeUser.name);
        expect(response.body.data.email).toBe(fakeUser.email)

    })



})
