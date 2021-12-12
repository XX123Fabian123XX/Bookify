// frameworks and drivers
const express = require("express");
const dotenv = require("dotenv");

const userRouter = require("../adapters/routes/userRouter")
const bookRouter = require("../adapters/routes/bookRouter")

dotenv.config();

const app = express();
const apiPrefix = process.env.APIPREFIX
//currently not working
//app.use(`${apiPrefix}/users`, userRouter)
//app.use(`${apiPrefix}/books`, bookRouter)

module.exports = app;


