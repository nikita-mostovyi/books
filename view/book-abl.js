const Book = require('../model/bookModel');
const { validateBook } = require('../validators/bookValidator');

class BookAbl {
  async list(params = {}) {
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 10;

    const books = await Book.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return books;
  }

  async get(id = '', res) {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async create(dtoIn = {}, res) {
    const { error } = validateBook(dtoIn);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    const book = new Book({
      title: dtoIn.title,
      author: dtoIn.author
    });

    return await book.save();
  }

  async update(dtoIn, id, res) {
    const { error } = validateBook(dtoIn);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    const book = await Book.findByIdAndUpdate(
      id,
      {
        title: dtoIn.title,
        author: dtoIn.author
      },
      { new: true }
    );

    if (!book) return res.status(404).send('The book with the given ID was not found.');
    return book;
  }

  async delete(id = '', res) {
    const book = await Book.findByIdAndRemove(id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    return book;
  }
}

module.exports = new BookAbl();
