const joi = require('joi');

function validateBook(book) {
  const schema = joi.object({
    title: joi.string()
      .min(3)
      .max(50)
      .required(),
    author: joi.string()
      .min(3)
      .max(50)
      .required()
  });

  return schema.validate(book);
}

module.exports = { validateBook };
