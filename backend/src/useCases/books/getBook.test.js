const { hasUncaughtExceptionCaptureCallback } = require("process");
const makeFakeBook = require("../../../__test__/__fixtures__/book")
const db = require("../../../__test__/__fixtures__/db")
const makeDbConnection = require("../../adapters/data-access/books/books-db");
const getBookInformation = require("../../utils/getBookInformation");
const buildUseCases = require("./index");

describe("get single book", () => {
    let useCases;
    beforeAll(async() => {
        useCases = buildUseCases(makeDbConnection(db));
    })

    afterAll(async() => {
        await db.connection.close()
    })

    it("lists a single book", async () => {
        const fakeBookInformation = getBookInformation(await makeFakeBook());

        await useCases.createBook(fakeBookInformation);

        const getBook = await useCases.getSingleBook(fakeBookInformation.id);

        expect(getBook).toMatchObject(fakeBookInformation);
    })
})