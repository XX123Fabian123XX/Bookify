const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const buildUserController = require("../users/userController");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");

describe("gets a single book", () => {
    let userController;
    let bookController;
    let user;
    beforeAll(async () => {
        user = await addUserToDatabase()
        userController = buildUserController(db);
        bookController = buildBookController(db);
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("gets a single book", async () => {
        const fakeBookInformation = getBookInformation(await makeFakeBook())
        const responseCreate = await bookController.createBook({body:fakeBookInformation, user});

        const id = responseCreate.body.data._id.toString();
        const req = {
            params: {
                id
            }
        }
        const response = await bookController.getSingleBook(req);
        expect(response.status).toBe(200)
        expect(response.message).toBe("success")
        expect(typeof response.body.data).toBe("object")

        responseCreate.body.data.userReference = user;

        expect(responseCreate.body.data).toMatchObject(response.body.data);
    })
})
