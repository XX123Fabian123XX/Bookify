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

        await useCases.updateBook(bookInformation.id, newBookInformation);

        const updatedBook = await useCases.getSingleBook(newBookInformation.id);
        const previousBook = await useCases.getSingleBook(bookInformation.id);

        expect(updatedBook).toMatchObject(newBookInformation);
        expect(previousBook).toBe(null);

    })    
})