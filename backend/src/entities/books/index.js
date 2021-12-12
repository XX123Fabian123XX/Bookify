const {dateValid} = require("./utils")
const {buildMakeBook} = require("./book")
const ID = require("../../utils/id")

exports.makeBook = buildMakeBook(dateValid, ID)
