const buildGetAllBooks = require("./getAllBooks");
const db = require("../../../../__test__/__fixtures__/db");

describe("get all books", () => {

    let getAllBooks;
    beforeAll(async () => {
        getAllBooks = await buildGetAllBooks(db);
    })

    afterAll(async() => {
        await db.connection.close()
    })

    
    it("gets all of the books", async () => {
        const response = await getAllBooks();

        expect(typeof response.statusCode).toBe("number")
        expect(typeof response.message).toBe("string")      
        expect(typeof response.body.length).toBe("number"),
        expect(typeof response.body.data).toBe("object")
    })
})
