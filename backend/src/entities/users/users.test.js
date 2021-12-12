const {makeUser} = require("./index.js")

describe("entities: UserEntity",  () => {
    test("name null", () => {
        return makeUser({email:"fabian.winkelmann1@gmail.com"}).catch(e => expect(e.message).toBe("You need a name to create a user"))
    })   
    
    test("name is too short", () => {
        return makeUser({name:"TW", "email":"fabian.winkelmann1@gmail.com"})
        .catch(e => expect(e.message).toBe("The name needs to be as least 3 characters long"))
    })
    test("email null", () => {
        return makeUser({name:"Das ist ein test"})
        .catch(e=> expect(e.message).toBe("You need an email to create a user"))
    })
    test("email invalid 1", () => {
        
        return makeUser({name:"Das ist ein test",email:"test"})
        .catch(e => expect(e.message).toBe("You need to enter a valid email"))
    })
    
    test("email invalid 2", () => {
        return makeUser({name:"Das ist ein test",email:"123123test@gmail."})
        .catch(e => expect(e.message).toBe("You need to enter a valid email"))
    })

    test("get Name", () => {
        return makeUser({name:"Fabian Winkelmann", email:"fabian.winkelmann1@gmail.com"})
        .then(e => expect(e.getName()).toBe("Fabian Winkelmann"))
    })

    test("get Email", () => {
        makeUser({name:"Fabian Winkelmann", email:"fabian.winkelmann1@gmail.com"})
        .then(e => expect(e.getEmail()).toBe("fabian.winkelmann1@gmail.com"))
    })

    test("password is null", () => {

        return makeUser({name:"Fabian Winkelmann", 
        email:"fabian.winkelmann1@gmail.com", passwordConfirm:"test"},createWithPassword=true)
        .catch(e => expect(e.message).toBe("You need a password to create a user"))
    })

    test("password is invalid 1", () => {
        return makeUser({name:"Fabian Winkelmann", 
        email:"fabian.winkelmann1@gmail.com",password:"test",passwordConfirm:"test"},createWithPassword=true)
        .catch(e => expect(e.message).toBe("The password is not valid"))
    })

    test("password confirm is null", () => {
        return makeUser({name:"Fabian Winkelmann", 
        email:"fabian.winkelmann1@gmail.com", password:"Test1234:)"},createWithPassword = true)
        .catch(e => expect(e.message).toBe("You need to confirm your password"))
    })

    test("password and password confirm have to match", () => {

        return makeUser({name:"Fabian Winkelmann",
        email:"fabian.winkelmann1@gmail.com", password:"testT1234:)",
        passwordConfirm:"testT12234:)"}, createWithPassword=true)
        .catch(e => expect(e.message).toBe("The password and the password confirm do not match"))
    })
    
    test("password is encrypted", () => {
        return makeUser({name:"Fabian Winkelmann",
        email:"fabian.winkelmann1@gmail.com", password:"testT1234:)",
        passwordConfirm:"testT1234:)"}, createWithPassword=true).
        then(e => expect(e.getPassword).not.toEqual("testT1234:"))
        
    })


})