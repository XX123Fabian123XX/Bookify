const {dateValid} = require("./utils")
const {buildMakeBook} = require("./book")

exports.makeBook = buildMakeBook(dateValid)
