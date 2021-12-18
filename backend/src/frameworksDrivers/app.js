const middleware = require("./makeCallback");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("../adapters/routes/userRouter")
const buildBookRouter = require("../adapters/routes/bookRouter")
const errorController = require("../adapters/controllers/errors/errorController");
const AppError = require("../adapters/controllers/errors/appError");


const buildApp = (db) => {

    // frameworks and drivers

    const bookRouter = buildBookRouter(express.Router(), middleware, db);
    const userRouter = buildUserRouter(express.Router(), moddleware, db);
    dotenv.config();

    const app = express();
    const apiPrefix = process.env.APIPREFIX

    // parser for json data
    app.use(express.json())

    app.use(`${apiPrefix}/users`, userRouter)
    app.get("/", (req,res) => {res.send("test")});
    app.use(`${apiPrefix}/books`, bookRouter)
    app.all("*", (req,res,next) => {
        next(new AppError("Cannot find this route on this server", 404))
    })
    app.use(errorController)

    return app;
}

module.exports = buildApp;

