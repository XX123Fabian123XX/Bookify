const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");

describe("create book", () => {
    let bookController;
    let user;

    beforeAll(async () => {      
        bookController = buildBookController(db)
        user = await addUserToDatabase();
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("creates a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook());
        const req = {
            body:fakeBookInformation,
            user
        }
        const response = await bookController.createBook(req)
        expect(response.status).toBe(201)
        expect(response.message).toBe("success")      
        response.body.data.id = response.body.data._id;
        expect(response.body.data).toMatchObject(fakeBookInformation)
    })
})
