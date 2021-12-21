const db = require("../../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");
const makeFakeUser = require("../../../../__test__/__fixtures__/user");
const getUserInformation = require("../../../utils/getUserInformation");
const buildUserController = require("./userController");
const faker = require("faker");

describe("signup user", () => {
    let user
    let userController;
    beforeAll(async() => {
        userController = buildUserController(db);
    })

    afterAll(() => {
        db.connection.close();
    })

    it("signs a user up", async() => {
        const fakeUser = getUserInformation(await makeFakeUser())
        const password = faker.internet.password + ".)";
        const response = await userController.signupUser({body:{...fakeUser, password, passwordConfirm:password}})

        expect(response.status).toBe(201);
        expect(response.message).toBe("success");
        expect(response.body).toHaveProperty("token");

        fakeUser._id = fakeUser.id;
        delete fakeUser.id;

        expect(response.body.data).toMatchObject(fakeUser);

    })
})
