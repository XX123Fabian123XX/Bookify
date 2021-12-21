const faker = require("faker");
const mongoose = require("mongoose");
const {makeBook} = require("../../src/entities/books/index");
const format = require('date-format');
const makeFakeBook = async function(overrides) {
        const book = await makeBook({
            id: mongoose.Types.ObjectId(),
            title: faker.lorem.sentence(),
            author:faker.name.firstName() + " " + faker.name.lastName(),
            datePublished: format("MM/dd/yyyy", new Date()),
            linkBookCoverImage:faker.internet.password(),
            linkBookBackImage:faker.internet.password(),
            numberPages: 20,
            rating: 50,
            genre:faker.music.genre(),
            userReference:faker.random.word(),
            ...overrides
        })
        return book;
}

module.exports = makeFakeBook


