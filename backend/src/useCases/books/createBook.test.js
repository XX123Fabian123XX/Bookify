const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildBookUseCases = require("./index");
const getUserInformation = require("../../utils/getUserInformation");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");


describe("create book", () => {
    let bookUseCases;
    let user;
    beforeAll(async() => {
        bookUseCases = buildBookUseCases(makeDbConnection(db));
        user = await addUserToDatabase();
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("must create a book", async () => {
        const book = await makeFakeBook({userReference: user._id});
        const insertedBook = await bookUseCases.createBook(getBookInformation(book));

        insertedBook.id = insertedBook._id;
        
        expect(insertedBook).toMatchObject(getBookInformation(book));
    })
})