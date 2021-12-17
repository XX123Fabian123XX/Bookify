const { hasUncaughtExceptionCaptureCallback } = require("process");
const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("update book", () => {
    let useCases;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("updates a book", async () => {
        const bookInformation = getBookInformation(await makeFakeBook());

        await useCases.createBook(bookInformation);

        const newBookInformation = getBookInformation(await makeFakeBook())

        const updatedBook = await useCases.updateBook(bookInformation.id, newBookInformation);

        expect(updatedBook.id).not.toEqual(newBookInformation.id)
        delete updatedBook["id"]
        delete newBookInformation["id"]
        expect(updatedBook).toMatchObject(newBookInformation)
    })    
})