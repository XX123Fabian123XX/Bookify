const cuid = require("cuid");

module.exports = {
    makeId:cuid,
    isId:cuid.isCuid

}
