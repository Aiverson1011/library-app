const Book = require("../models/Book");
const Author = require("../models/Author");
const mongoose = require("mongoose");

exports.getAllbooks = async (req, res) => {
    try {
        const books = await Book.find().sort({title: 1});
        const response = {
            books: books.map(book => ({
                id: book._id,
                title: book.title,
                author: book.author,
                available: book.availability.available > 0,
            }))
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving books",
            error: error.message
        });
    }
};

exports.createBook = async (req, res) => {
    res.status(201).json({
        message: "You've created a book"
    });

};

exports.deleteBook = (req, res) => {
    res.status(200).json({
        message: "Book deleted",
    });
};

exports.updateBook = (req, res) => {
    res.json({
        message: `book id ${req.params.id} updated`
    });
};

exports.getBookById = (req, res) => {
    res.json({
        message: `book id ${req.params.id} retreived`
    });
};