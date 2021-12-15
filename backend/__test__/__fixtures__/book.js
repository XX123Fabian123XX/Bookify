const faker = require("faker");
const {makeBook} = require("../../src/entities/books/index");

const makeFakeBook = async function(overrides) {
        const book = await makeBook({
            title: faker.lorem.sentence(),
            author:faker.name.firstName() + " " + faker.name.lastName(),
            datePublished: faker.date.recent(),
            linkBookCover:faker.internet.password(),
            linkBookBack:faker.internet.password(),
            numberPages: 20,
            rating: 50,
            genre:faker.music.genre(),
            userReference:faker.random.word(),
            ...overrides
        })
        return book;
}

module.exports = makeFakeBook


