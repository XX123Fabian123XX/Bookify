const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const makeDbConnection = require("./books-db");
const getBookInformation = require("../../../utils/getBookInformation")
const databaseFunctions = makeDbConnection(db);
const {addUserToDatabase} = require("../../../../__test__/__fixtures__/helper")

describe("book database", () => {

    let user
    beforeAll( async() => {
        user = await addUserToDatabase();
    })

    afterAll(async () => {
        await db.connection.close()
    })

    it("list books", async () => {
        const books = await Promise.all([makeFakeBook({userReference: user._id}), makeFakeBook({userReference: user._id}), makeFakeBook({userReference: user._id}), makeFakeBook({userReference: user._id})]);
        const bookInformation = books.map(getBookInformation)
        const inserts = await Promise.all(bookInformation.map(databaseFunctions.createBook))
        
        inserts.forEach(insert => {insert.userReference = user});

        const found = await databaseFunctions.getAllBooks({query:{}});

        expect.assertions(inserts.length)

        return inserts.forEach(insert => expect(found).toContainEqual(insert))
    })

    it("inserts a book", async () => {
        const book = await makeFakeBook({userReference:user._id});
        const bookInformation = getBookInformation(book);
        let insert = await databaseFunctions.createBook(bookInformation)
        let found = await databaseFunctions.getSingleBook(book.getId());
        insert.userReference = user;

        expect(found).toEqual(insert);
    })

    it("updates a book", async () => {
        const book = await makeFakeBook({userReference: user._id});
        await databaseFunctions.createBook(getBookInformation(book));
        const newBook = await makeFakeBook({userReference: user._id});
        const updatedBook = await databaseFunctions.updateBook(book.getId(), getBookInformation(newBook));
        updatedBook.userReference = user;

        const updateBookById = await databaseFunctions.getSingleBook(book.getId());

        expect(updatedBook).toEqual(updateBookById);
    })

    it("deletes a book", async () => {
        const book = await makeFakeBook({userReference:user._id});
        await databaseFunctions.createBook(getBookInformation(book));
        await databaseFunctions.deleteBook(book.getId());
        return databaseFunctions.getSingleBook(book.getId()).catch(e => expect(e.message).toBe(`No book was found with the id ${book.getId()}`))
    })
 })
