// function to validate a date
const validateDate = require("validate-date");

exports.dateValid = (date) => {
    if (!date) return false
    return validateDate(date, responseType="boolean");
}
