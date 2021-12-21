const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");
const { addUserToDatabase } = require("../../../../__test__/__fixtures__/helper");

describe("delete book", () => {
    let bookController;
    let user
    beforeAll(async () => {      
        bookController = buildBookController(db)
        user = await addUserToDatabase();
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("delete a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook({userReference: user._id}));

        const createRequest = {
            body:fakeBookInformation,
            user
        }

        const createdBookResponse = await bookController.createBook(createRequest);
        const id = createdBookResponse.body.data._id;

        const req = {
            params:{
                id:id
            },
            user
        }
        const deleteBookResponse = await bookController.deleteBook(req)
        expect(deleteBookResponse.status).toBe(204)
        expect(deleteBookResponse.message).toBe("success")
        expect(deleteBookResponse.body.data).toBe(null)
    })

})
