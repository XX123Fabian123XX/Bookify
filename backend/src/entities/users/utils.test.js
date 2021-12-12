const {isEmailValid, isPasswordValid, encryptPassword} = require("./utils")

describe("Entity: utils.js (User)", () => {
    test("valid email 1", () => {
        expect(isEmailValid("test")).toBe(false)
    })

    test("valid email 2", () => {
        expect(isEmailValid("fabian.winkelmann1@gmail.com")).toBe(true)
    })

    test("valid email 3", () => {
        expect(isEmailValid("test@gmail")).toBe(false)
    })

    test("password valid 1 (not the right length)", () => {
        // not the right length
        expect(isPasswordValid("Test12:")).toBe(false)
    })

    test("password valid 2 (no uppercase letter)", () => {
        // no uppercase letter
        expect(isPasswordValid("test12:)")).toBe(false)
    })

    test("password valid 3 (no special case letter)", () => {
        // no special character
        expect(isPasswordValid("Test1234")).toBe(false)
    })

    test("password valid 4 (correct password)", () => {
        // password is correct
        expect(isPasswordValid("TQBf1:) ")).toBe(true)
    })

    test("password valid 5 (no lowercase letter)", () => {
        // no lowercase letter
        expect(isPasswordValid("TQBRL.)§1")).toBe(false)
    })

    test("password valid 6 (no special case letter)", () => {
        // no special case letter
        expect(isPasswordValid("TQBRLq23 ")).toBe(false)
    })

    test("password valid 7 (long password)", () => {
        expect(isPasswordValid("            123123  aa aaaa  A A A A :)")).toBe(true)
    })

    test("encrypt password", () => {
        expect(encryptPassword("das ist ein test")).not.toBe("das ist ein test")
    })

})