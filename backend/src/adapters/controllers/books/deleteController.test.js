const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");
const { hasUncaughtExceptionCaptureCallback } = require("process");
 buildUseCases = require("../../../useCases/books");

describe("delete book", () => {
    let bookController;

    beforeAll(async () => {      
        bookController = buildBookController(dbConnection(db))
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("delete a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook());
        const createdBookResponse = await bookController.createdBook({body: fakeBookInformation});
        const id = createdBookResponse.body.data.id;
        const deleteBookResponse = await bookController.deleteBook({params:{id}})

        expect(deleteBookResponse.status).toBe(204)
        expect(deleteBookResponse.message).toBe("success")
        expect(deleteBookResponse.body.data).toBe("null")

    })

})
