const db = require("../../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");
const buildUserController = require("./userController");
const faker = require("faker");


describe("update user password", () => {
    let user
    let userController;
    const password = faker.internet.password() + " .."
    beforeAll(async() => {
        user = await addUserToDatabase({password, passwordConfirm:password});
        userController = buildUserController(db);
    })

    afterAll(() => {
        db.connection.close();
    })

    it("updates the user password", async() => {
        const newPassword = faker.internet.password() + "...."
        user.id = user._id;
        const req = {
            body: {
                oldPassword:password,
                newPassword,
                passwordConfirm: newPassword
            },
            user
        }

        const responseUpdatePassword = await userController.updateUserPassword(req)

        expect(responseUpdatePassword.status).toBe(200);
        expect(responseUpdatePassword.message).toBe("success")
        expect(responseUpdatePassword.body).toHaveProperty("token");
        expect(responseUpdatePassword.body.data.password).not.toEqual(user.password);

    })



})
