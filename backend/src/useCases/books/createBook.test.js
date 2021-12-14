const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("create book", () => {
    let useCases;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("must create a book", async () => {
        const book = await makeFakeBook();
        const insertedBook = await useCases.createBook(getBookInformation(book))

        expect(insertedBook).toMatchObject(getBookInformation(book));
    })
})