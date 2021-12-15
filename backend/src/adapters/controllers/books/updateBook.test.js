const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");
const { hasUncaughtExceptionCaptureCallback } = require("process");

describe("update book", () => {
    let bookController;

    beforeAll(async () => {      
        bookController = buildBookController(dbConnection(db))
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("updates a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook());
        const createdBookResponse = await bookController.createBook({body: fakeBookInformation});
        const id = createdBookResponse.body.data.id;
        const newFakeBookInformation = getBookInformation(await makeFakeBook())

        const updatedBookResponse = await bookController.updateBook({params:{id}, body:newFakeBookInformation})

        expect(updatedBookResponse.status).toBe(202)
        expect(updatedBookResponse.message).toBe("success")
        console.log(fakeBookInformation)
        console.log(newFakeBookInformation)
        expect(updatedBookResponse.body.data).toMatchObject(newFakeBookInformation)
    })

})
