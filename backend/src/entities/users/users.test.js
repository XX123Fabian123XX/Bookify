const makeFakeUser = require("../../../__test__/__fixtures__/user");

describe("entities: UserEntity",  () => {
    it("must have a name", () => {
        return makeFakeUser({name:null}).catch(e => expect(e.message).toBe("You need a name to create a user"))
    })   
    
    it("must have a name that is long enough", () => {
        return makeFakeUser({name:"TW"})
        .catch(e => expect(e.message).toBe("The name needs to be as least 3 characters long"))
    })
    it("must have an email", () => {
        return makeFakeUser({email:null})
        .catch(e=> expect(e.message).toBe("You need an email to create a user"))
    })
    it("must have a valid email ", () => {
        
        return makeFakeUser({email:"test"})
        .catch(e => expect(e.message).toBe("You need to enter a valid email"))
    })
    
    it("must have a valid email", () => {
        return makeFakeUser({email:"123123test@gmail."})
        .catch(e => expect(e.message).toBe("You need to enter a valid email"))
    })

    it("must return the name correctly", () => {
        return makeFakeUser({name:"Fabian Winkelmann"})
        .then(e => expect(e.getName()).toBe("Fabian Winkelmann"))
    })

    it("must return the email correctly", () => {
        makeFakeUser({email:"fabian.winkelmann1@gmail.com"})
        .then(e => expect(e.getEmail()).toBe("fabian.winkelmann1@gmail.com"))
    })

    it("must have a password", () => {

        return makeFakeUser({password:null},createWithPassword=true)
        .catch(e => expect(e.message).toBe("You need a password to create a user"))
    })

    it("must have a valid password", () => {
        return makeFakeUser({password:"test"},createWithPassword=true)
        .catch(e => expect(e.message).toBe("The password is not valid"))
    })

    it("must have a password confirm", () => {
        return makeFakeUser({passwordConfirm:null},createWithPassword = true)
        .catch(e => expect(e.message).toBe("You need to confirm your password"))
    })

    it("must have equal password and equal passwordconfirm", () => {

        return makeFakeUser({
        password:"testT1234:)", passwordConfirm:"testT12234:)"}, createWithPassword=true)
        .catch(e => expect(e.message).toBe("The password and the password confirm do not match"))
    })
    
    it("must have an encrypted password", () => {
        return makeFakeUser({
        password:"testT1234:)",
        passwordConfirm:"testT1234"}, createWithPassword=true).
        then(e => expect(e.getPassword).not.toEqual("testT1234:"))
        
    })
})