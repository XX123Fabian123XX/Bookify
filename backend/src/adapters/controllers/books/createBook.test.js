const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");

describe("create book", () => {
    let bookController;

    beforeAll(async () => {      
        bookController = buildBookController(dbConnection(db))
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("creates a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook());
        const req = {
            body:fakeBookInformation
        }
        const response = await bookController.createBook(req)

        expect(typeof response.status).toBe("number")
        expect(typeof response.message).toBe("string")      
        expect(typeof response.body.data).toBe("object")
    })

})
