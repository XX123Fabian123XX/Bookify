const fs = require("fs");
const path = require("path");
const fileExists = async(pathToFile) => {
    fs.access(pathToFile, (err) => {
        if (err) return false;
        return true;
    })
}

const deleteFileFromUploads = async(filename) => {
    // figure out the path
    const pathToFile = path.join(__dirname, `../../../../uploads/${filename}`)
    console.log(pathToFile)
    // check if the file exists
    if (!fileExists(pathToFile)) return console.log("this file does not exist");
    console.log("this file does exist")
    // delete the file
    fs.unlink(pathToFile, (err) => {
        if (err) return console.log("could not delete the file")
        console.log("deleted the file successfully")
    })
}

module.exports = deleteFileFromUploads;

