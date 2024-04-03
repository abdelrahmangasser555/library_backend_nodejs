const mongoose = require("mongoose");

const Book = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

const BookModel = mongoose.model("Book", Book);
module.exports = BookModel;
