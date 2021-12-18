const bcrypt = require("bcryptjs");
const verifyPassword = async (encryptedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, encryptedPassword)
}

module.exports = verifyPassword;

