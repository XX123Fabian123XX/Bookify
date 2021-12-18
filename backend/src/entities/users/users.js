// business logic for the users
const BaseError = require("../../utils/baseError")
exports.buildMakeUser = function(isEmailValid, isPasswordValid, encryptPassword, ID) {
    return  async function({
        name,
        email,
        password,
        passwordConfirm,
        id=ID.makeId()
    
    } = {}, createWithPassword = false) {

        if (!ID.isId(id)) {
            throw new BaseError("The id is not valid")
        }

        // TODO: add more validation to the name
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
        // TODO: refactor the freezed object, it is somewhat duplicate
        if (!createWithPassword) {
            return Object.freeze(
                {
                    getName: () => name,
                    getEmail: () => email,
                    getCreatedAt: () => createdAt,      
                    getId:() => id        
                })
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

        return Object.freeze({
            getName:() => name,
            getEmail: () => email,
            getCreatedAt:() => createdAt,
            getPassword:() => password,
            getId: () => id,
        })
    }
}