const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");
const { hasUncaughtExceptionCaptureCallback } = require("process");

describe("gets a single book", () => {

    let bookController;
    beforeAll(async () => {
        bookController = await buildBookController(dbConnection(db))
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("gets a single book", async () => {
        const fakeBookInformation = getBookInformation(await makeFakeBook())
        const responseCreate = await bookController.createBook({body:fakeBookInformation});
        const id = responseCreate.body.data.id;
        const req = {
            params: {
                id
            }
        }
        const response = await bookController.getSingleBook(req);
        expect(typeof response.status).toBe("number")
        expect(typeof response.message).toBe("string")
        expect(typeof response.body.data).toBe("object")
        expect(responseCreate.body.data).toMatchObject(response.body.data);
    })
})
