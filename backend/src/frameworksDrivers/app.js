const middleware = require("./makeCallback");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("../adapters/routes/userRouter")
const buildBookRouter = require("../adapters/routes/bookRouter")

const buildApp = (db) => {

    // frameworks and drivers

    const bookRouter = buildBookRouter(express.Router(), middleware, db);

    dotenv.config();

    const app = express();
    const apiPrefix = process.env.APIPREFIX

    //app.use(`${apiPrefix}/users`, userRouter)
    app.get("/", (req,res) => {res.send("test")});
    app.use(`${apiPrefix}/books`, bookRouter)
    app.use(function(err,req,res,next) {
        res.json({
            statusCode:"500",
            message:"global error ahndler",
            err
        })
    })
    return app;
}

module.exports = buildApp;

