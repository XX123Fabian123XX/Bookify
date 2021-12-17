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

    it("deletes a book", async () => {
        const fakeBook = await makeFakeBook();
        await useCases.createBook(getBookInformation(fakeBook));        
        await useCases.deleteBook(fakeBook.getId());
        return useCases.getSingleBook(fakeBook.getId()).catch(e => {
            expect(e.message).toBe(`No book was found with the id ${fakeBook.getId()}`)
        })
    })

})