// Imports
const express = require('express');

const router = express.Router();
const BookAbl = require('../view/book-abl');
// Imports

// Get all books
router.get('/books', async (req, res) => {
  const books = await BookAbl.list(req.params);
  res.send(books);
});

// Get a specific book by id
router.get('/books/:id', async (req, res) => {
  const book = await BookAbl.get(req.params.id, res);
  res.send(book);
});

// Create a new book
router.post('/books', async (req, res) => {
  const book = await BookAbl.create(req.body, res);
  res.send(book);
});

// Update a book
router.put('/books/:id', async (req, res) => {
  const book = await BookAbl.update(req.body, req.params.id, res);
  res.send(book);
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
  const book = await BookAbl.delete(req.params.id, res);
  res.send(book);
});

module.exports = router;
