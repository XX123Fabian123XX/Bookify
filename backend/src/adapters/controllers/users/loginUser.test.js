const db = require("../../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");
const buildUserController = require("./userController");

describe("login user", () => {
    let user
    let userController;
    const password = "TLKÖASDKLlASKLÖD123123:)"
    beforeAll(async() => {
        user = await addUserToDatabase({password, passwordConfirm:password});
        userController = buildUserController(db);
    })

    afterAll(() => {
        db.connection.close();
    })

    it("logs the user in", async() => {
        const response = await userController.loginUser({body:{email:user.email, password}})

        expect(response.status).toBe(200);
        expect(response.message).toBe("success")
        expect(user).toMatchObject(response.body.data)
        expect(response.body).toHaveProperty("token")

    })



})
