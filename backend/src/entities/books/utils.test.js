const {dateValid} = require("./utils");
const dateformat = require("date-format")
describe("utils test", () => {
    it("validates a date", () => {
        expect(dateValid("02/07/2021")).toBe(true)
        expect(dateValid("02/19/2021")).toBe(true)
        expect(dateValid("15/02/2019")).toBe(false)
        expect(dateValid("3/2/2021")).toBe(false)
        expect(dateValid("")).toBe(false)
        expect(dateValid(dateformat("mm/dd/yyyy", new Date()))).toBe(true)
        expect(dateValid("das ist ein test")).toBe(false)
    })
})