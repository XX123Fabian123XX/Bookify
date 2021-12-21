const buildBookController = require("./bookController")
const db = require("../../../../__test__/__fixtures__/db");
const buildUserController = require("../users/userController");

describe("get all books", () => {

    let bookController
    let userController
    beforeAll(async () => {
        bookController = buildBookController(db);
        userController = buildUserController(db);
    })

    afterAll(async() => {
        await db.connection.close()
    })

    
    it("gets all of the books", async () => {
        const response = await bookController.getAllBooks({query:{}});
        
        expect(response.statusCode).toBe(200)
        expect(response.message).toBe("success")      
        expect(typeof response.body.length).toBe("number"),
        expect(typeof response.body.data).toBe("object")
    })
})
