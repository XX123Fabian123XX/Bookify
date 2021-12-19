// business logic for the users
const BaseError = require("../../utils/baseError")
exports.buildMakeUser = function(isEmailValid, isPasswordValid, encryptPassword, ID) {
    return  async function({
        name,
        email,
        password,
        passwordConfirm,
        id=ID.makeId(),
        passwordLastChanged,
    
    } = {}, createWithPassword = false) {

        if (!name) {
            throw new BaseError("You need a name to create a user")
        }
    
        if (name.length <= 2) {
            throw new BaseError("The name needs to be as least 3 characters long")
        }
    
        if (!email) {
            throw new BaseError("You need an email to create a user")
        }
    
        if (!isEmailValid(email)) {
            throw new BaseError("You need to enter a valid email")
        }

        const createdAt = new Date();

        let returnObject = {
            getName: () => name,
            getEmail: () => email,
            getCreatedAt: () => createdAt,      
            getId:() => id        
        }

        if (!createWithPassword) {
            return Object.freeze(returnObject)
        }


        if (!password) {
            throw new BaseError("You need a password to create a user")
        }

        if (!isPasswordValid(password)) {
            throw new BaseError("The password is not valid")
        }

        if (!passwordConfirm) {
            throw new BaseError("You need to confirm your password")
        }

        if (passwordConfirm !== password) {
            throw new BaseError("The password and the password confirm do not match")
        }

        password = await encryptPassword(password)

        passwordLastChanged = Date.now() - 1000;

        returnObject = {
            ...returnObject,
            getPassword:() => password,
            getPasswordLastChanged:() => passwordLastChanged
        }

        return Object.freeze(returnObject)
    }
}