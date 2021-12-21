const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");

describe("get all books", () => {
    let useCases;
    let user;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
        user = await addUserToDatabase()
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("lists all books", async () => {
        const fakeBookInformation = (await Promise.all(
            [await makeFakeBook({userReference:user._id}), await makeFakeBook({userReference:user._id}), await makeFakeBook({userReference:user._id})])).map(getBookInformation);
        
        await Promise.all(fakeBookInformation.map(useCases.createBook));

        const allBooks = await useCases.getAllBooks({query:{}});
        allBooks.forEach(book => {book.id = book._id})
        fakeBookInformation.forEach(book => {
            if (book.userReference.toString() == user._id) book.userReference = user;
        })

        fakeBookInformation.forEach(fakeBook => {
            const foundBook = allBooks.find(el => el.id.toString() === fakeBook.id.toString())
            expect(foundBook).toMatchObject(fakeBook);
        })
    })
})