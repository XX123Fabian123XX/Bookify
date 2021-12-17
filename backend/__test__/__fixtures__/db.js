const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = "mongodb+srv://test:test1234@cluster0.njiqs.mongodb.net/test"

mongoose.connect(connectionString).catch(err => {
    console.log("Error while connecting to the database")
})

module.exports = mongoose;

