// create a random user and inject it into the database
const mongoose = require("./db");
const dbConnection = require("../../src/adapters/data-access/users/user-db");
const userDbConnection = dbConnection(mongoose);
const makeFakeUser = require("./user");
const getUserInformation = require("../../src/utils/getUserInformation")

exports.addUserToDatabase = async (options) => {
    const user = await makeFakeUser(options, true);
    return await userDbConnection.createUser(getUserInformation(user))
}   




