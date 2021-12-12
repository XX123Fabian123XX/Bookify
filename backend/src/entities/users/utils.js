const validator = require("email-validator")
const bcrypt = require("bcryptjs")
exports.isEmailValid = email => {
    return validator.validate(email)
}

exports.isPasswordValid = password => {
    const match = password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}/)
    return match ? true : false
}

exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;    
}