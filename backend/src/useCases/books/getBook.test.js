const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");
const {addUserToDatabase} = require("../../../__test__/__fixtures__/helper");

describe("get single book", () => {
    let useCases;
    let user;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
        user = await addUserToDatabase();
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("lists a single book", async () => {
        const fakeBookInformation = getBookInformation(await makeFakeBook({userReference: user._id}));

        await useCases.createBook(fakeBookInformation);

        const getBook = await useCases.getSingleBook(fakeBookInformation.id);
        getBook.id = getBook._id;
        expect(getBook).toMatchObject(fakeBookInformation);
    })
})