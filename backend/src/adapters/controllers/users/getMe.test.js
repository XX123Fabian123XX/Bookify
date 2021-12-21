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

    it("gets me", async() => {
        const response = await userController.getMe({user});

        const expectedResponse = {
            message:"success",
            status:200,
            body: {
                data:{
                    name:user.name,
                    email:user.email
                }
            }
        }

        expect(response).toMatchObject(expectedResponse);

    })



})
