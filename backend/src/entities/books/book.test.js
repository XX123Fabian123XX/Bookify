const {makeBook} = require("./index")

describe("book testing", () => {
    test("Book needs a title", () => {
        return makeBook().catch(e => expect(e.message).toBe("A book needs a title"))
    })

    test("A book needs an author", () => {
        return makeBook({title:"test"}).catch(e => expect(e.message).toBe("A book needs an author"))
    })

    test("A books needs a publishing date", () => {
        return makeBook({title:"test", author:"test"}).catch(e => expect(e.message).toBe("A books needs a publishing date"))
    })

    test("A book needs to have a page number",() => {
        return makeBook({title:"test", author:"test", datePublished:"test"}).catch(e => expect(e.message).toBe("A book needs to have a page number"))
    })

    test("A book needs to have a user reference", () => {
        return makeBook({title:"test", author:"test", datePublished:"test", numberPages:123}).catch(e => expect(e.message).toBe("The book needs to have a user reference"))
    })

})