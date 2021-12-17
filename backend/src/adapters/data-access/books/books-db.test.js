const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const makeDbConnection = require("./books-db");
const getBookInformation = require("../../../utils/getBookInformation")
const databaseFunctions = makeDbConnection(db);


describe("book database", () => {

    afterAll(async () => {
        await db.connection.close()
    })

    it("list books", async () => {
        const books = await Promise.all([makeFakeBook(), makeFakeBook(), makeFakeBook(), makeFakeBook()]);
        const bookInformation = books.map(getBookInformation)
        const inserts = await Promise.all(bookInformation.map(databaseFunctions.createBook))
        
        const found = await databaseFunctions.getAllBooks({query:{}});

        expect.assertions(inserts.length)

        return inserts.forEach(insert => expect(found).toContainEqual(insert))
    })

    it("inserts a book", async () => {
        const book = await makeFakeBook();
        const bookInformation = getBookInformation(book);
        let insert = await databaseFunctions.createBook(bookInformation)
        let found = await databaseFunctions.getSingleBook(book.getId());
        delete insert["_id"]
        console.log(insert)

        expect(found).toEqual(insert);
    })

    it("updates a book", async () => {
        const book = await makeFakeBook();
        await databaseFunctions.createBook(getBookInformation(book));
        const newBook = await makeFakeBook();
        const updatedBook = await databaseFunctions.updateBook(book.getId(), getBookInformation(newBook));
        const updateBookById = await databaseFunctions.getSingleBook(newBook.getId());

        expect(updatedBook).toEqual(updateBookById);
    })

    it("deletes a book", async () => {
        const book = await makeFakeBook();
        await databaseFunctions.createBook(getBookInformation(book));
        await databaseFunctions.deleteBook(book.getId());
        return databaseFunctions.getSingleBook(book.getId()).catch(e => expect(e.message).toBe(`No book was found with the id ${book.getId()}`))
    })
 })
