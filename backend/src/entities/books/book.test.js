const {makeBook} = require("./index")
const makeFakeBook = require("../../../__test__/__fixtures__/book");

describe("book testing", () => {
    test("Book needs valid id", () => {
        return makeFakeBook({id:"test"}).catch(e => expect(e.message).toBe("Please provide a valid id"))
    })
    test("Book needs a title", () => {
        return makeFakeBook({title:null}).catch(e => expect(e.message).toBe("A book needs a title"))
    })

    test("A book needs an author", () => {
        return makeFakeBook({author:null}).catch(e => expect(e.message).toBe("A book needs an author"))
    })

    test("A books needs a publishing date", () => {
        return makeFakeBook({datePublished:null}).catch(e => expect(e.message).toBe("A books needs a publishing date"))
    })

    test("A book needs to have a page number",() => {
        return makeFakeBook({numberPages:null}).catch(e => expect(e.message).toBe("A book needs to have a page number"))
    })

    test("A book needs to have a user reference", () => {
        return makeFakeBook({userReference:null}).catch(e => expect(e.message).toBe("The book needs to have a user reference"))
    })

})