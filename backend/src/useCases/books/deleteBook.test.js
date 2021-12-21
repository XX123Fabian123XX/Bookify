const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper")

describe("delete book", () => {
    let useCases;
    let user;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
        user = await addUserToDatabase();
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("deletes a book", async () => {
        const fakeBook = await makeFakeBook({userReference: user._id});
        await useCases.createBook(getBookInformation(fakeBook));        
        await useCases.deleteBook(fakeBook.getId());
        return useCases.getSingleBook(fakeBook.getId()).catch(e => {
            expect(e.message).toBe(`No book was found with the id ${fakeBook.getId()}`)
        })
    })

    it("tries to delete a book that does not exists", async() => {
        const fakeId = "61c173290439e3d12b51f589"
        return useCases.deleteBook(fakeId)
        .catch(e => expect(e.message).toBe(`Object with id ${fakeId} was not found`))
    })

})