const { hasUncaughtExceptionCaptureCallback } = require("process");
const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db");
const { addUserToDatabase } = require("../../../__test__/__fixtures__/helper");
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("update book", () => {
    let useCases;
    let user;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
        user = await addUserToDatabase();
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("updates a book", async () => {
        const bookInformation = getBookInformation(await makeFakeBook({userReference:user._id}));

        const createdBook = await useCases.createBook(bookInformation);

        const newBookInformation = getBookInformation(await makeFakeBook({userReference:user._id}))

        const updatedBook = await useCases.updateBook(bookInformation.id, newBookInformation);

        expect(createdBook._id.toString()).toEqual(updatedBook._id.toString())
        updatedBook.id = updatedBook._id;
        expect(updatedBook).toMatchObject(newBookInformation);


        
    })    
})