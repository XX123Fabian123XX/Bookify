const db = require("../../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");
const buildUserController = require("./userController");

describe("create book", () => {
    let user
    let userController;
    beforeAll(async() => {
        user = await addUserToDatabase();
        userController = buildUserController(db);
    })

    afterAll(() => {
        db.connection.close();
    })

    it("deletes me", async () => {
        const response = await userController.deleteMe({user})

        expect(response.message).toBe("success");
        expect(response.status).toBe(204);
        expect(response.body.data).toBe(null)

    })



})
