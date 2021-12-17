// business logic for the users
exports.buildMakeUser = function(isEmailValid, isPasswordValid, encryptPassword, ID) {
    return  async function({
        name,
        email,
        password,
        passwordConfirm,
        id=ID.makeId()
    
    } = {}, createWithPassword = false) {

        if (!ID.isId(id)) {
            throw new Error("The id is not valid")
        }

        if (!name) {
            throw new Error("You need a name to create a user")
        }
    
        if (name.length <= 2) {
            throw new Error("The name needs to be as least 3 characters long")
        }
    
        if (!email) {
            throw new Error("You need an email to create a user")
        }
    
        if (!isEmailValid(email)) {
            throw new Error("You need to enter a valid email")
        }

        const createdAt = new Date();

        if (!createWithPassword) {
            return Object.freeze(
                {
                    getName: () => name,
                    getEmail: () => email,
                    getCreatedAt: () => createdAt,              
                })
        }


        if (!password) {
            throw new Error("You need a password to create a user")
        }

        if (!isPasswordValid(password)) {
            throw new Error("The password is not valid")
        }

        if (!passwordConfirm) {
            throw new Error("You need to confirm your password")
        }

        if (passwordConfirm !== password) {
            throw new Error("The password and the password confirm do not match")
        }

        password = await encryptPassword(password)

        const lastLoggedIn = new Date();

        return Object.freeze({
            getName:() => name,
            getEmail: () => email,
            getCreatedAt:() => createdAt,
            getPassword:() => password,
            lastLoggedIn:() => lastLoggedIn
        })
    }
}