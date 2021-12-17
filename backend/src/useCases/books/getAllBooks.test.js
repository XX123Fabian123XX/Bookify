const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("get all books", () => {
    let useCases;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("lists all books", async () => {
        const fakeBookInformation = (await Promise.all(
            [await makeFakeBook(), await makeFakeBook(), await makeFakeBook()])).map(getBookInformation);
        
        await Promise.all(fakeBookInformation.map(useCases.createBook));

        const allBooks = await useCases.getAllBooks({query:{}});

        fakeBookInformation.forEach(bookInformation => {
            const book = allBooks.find(el => el.id === bookInformation.id);
            expect(book).toMatchObject(bookInformation)
        })
    })
})