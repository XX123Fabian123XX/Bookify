const { hasUncaughtExceptionCaptureCallback } = require("process");
const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("delete book", () => {
    let useCases;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("should delete a book", async () => {
        const fakeBook = await makeFakeBook();
        await useCases.createBook(getBookInformation(fakeBook));        
        await useCases.deleteBook(fakeBook.getId());
        const searchForBook = await useCases.getSingleBook(fakeBook.getId());
        expect(searchForBook).toEqual(null);
    })

})