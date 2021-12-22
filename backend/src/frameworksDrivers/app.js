const middleware = require("./makeCallback");
const express = require("express");
const dotenv = require("dotenv");
const buildUserRouter = require("../adapters/routes/userRouter")
const buildBookRouter = require("../adapters/routes/bookRouter")
const errorController = require("../adapters/controllers/errors/errorController");
const AppError = require("../adapters/controllers/errors/appError");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

dotenv.config();

const buildApp = (db) => {

    // frameworks and drivers
    const bookRouter = buildBookRouter(express.Router(), middleware, db);
    const userRouter = buildUserRouter(express.Router(), middleware, db);


    const app = express();

    app.use(express.json({limit:'10kb'}));

    const limit = rateLimit({
        max:150, // max requests,
        windowMs: 60*60*1000, // 1hour
        message:'Too many requests'
    })

    // security
    app.use('/api/v1', limit)

    app.use(xss());

    app.use(helmet());

    app.use(mongoSanitize());

    const apiPrefix = process.env.APIPREFIX

    // static route
    app.use("/api/v1/images",express.static(path.join(__dirname, "../../uploads")))

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

