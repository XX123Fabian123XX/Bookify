const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");
const deleteFileFromUploads = require("../utils/deleteUploads");

const buildUpdateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        //daten aus dem Body
        req.body.id = req.params.id

        const bookToUpdate = await useCases.getSingleBook(req.params.id);

        // update cover image
        if (req.files && req.files.bookCoverImage) {
            req.body.linkBookCoverImage = req.files.bookCoverImage[0].filename;

            // DELETE THE PREVIOUS IMAGE
            if (bookToUpdate.linkBookCoverImage) deleteFileFromUploads(bookToUpdate.linkBookCoverImage)
        } 

        // update back image
        if (req.files && req.files.bookBackImage) {
            req.body.linkBookBackImage = req.files.bookBackImage[0].filename
            
            if (bookToUpdate.linkBookBackImage) deleteFileFromUploads(bookToUpdate.linkBookBackImage);
        }

        // if the user simply wants to delete the image
        if (req.body.bookBackImage && req.body.bookBackImage === "delete") {
            if (bookToUpdate.linkBookBackImage) deleteFileFromUploads(bookToUpdate.linkBookBackImage);
            req.body.linkBookBackImage = ""
        }

        if (req.body.bookCoverImage && req.body.bookCoverImage === "delete") {
            if (bookToUpdate.linkBookCoverImage) deleteFileFromUploads(bookToUpdate.linkBookCoverImage);
            req.body.linkBookCoverImage = ""
        }

        const updatedBook = await useCases.updateBook(req.params.id, req.body);

        return {
            status:200,
            message:"success",
            body: {
                data: updatedBook
            }
        }
    }
} 





module.exports = buildUpdateBook