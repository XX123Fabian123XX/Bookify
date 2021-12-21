const buildBookController = require("./bookController");
const db = require("../../../../__test__/__fixtures__/db");
const makeFakeBook = require("../../../../__test__/__fixtures__/book");
const getBookInformation = require("../../../utils/getBookInformation");
const dbConnection = require("../../data-access/books/books-db");
const {addUserToDatabase} = require("../../../../__test__/__fixtures__/helper");

describe("update book", () => {
    let bookController;
    let user;
    beforeAll(async () => {      
        bookController = buildBookController(db)
        user = await addUserToDatabase();
    })

    afterAll(async () => {
        await db.connection.close();
    })

    it("updates a book", async() => {
        const fakeBookInformation = getBookInformation(await makeFakeBook({userReference: user._id}));
        const createdBookResponse = await bookController.createBook({body: fakeBookInformation, user});
        const id = createdBookResponse.body.data._id;
        const newFakeBookInformation = getBookInformation(await makeFakeBook({userReference:user._id}))

        const updatedBookResponse = await bookController.updateBook({params:{id}, body:newFakeBookInformation, user})
        updatedBookResponse.body.data.id = updatedBookResponse.body.data._id;

        expect(updatedBookResponse.status).toBe(200)
        expect(updatedBookResponse.message).toBe("success")
        expect(updatedBookResponse.body.data).toMatchObject(newFakeBookInformation)
    })

})
