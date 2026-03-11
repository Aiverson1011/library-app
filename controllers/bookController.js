const Book = require("../models/Book");
const Author = require("../models/Author");
const mongoose = require("mongoose");

function formatDate(dateValue) {
    if (!dateValue) return null;
    return new Date(dateValue).toISOString().split("T")[0];
};



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

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json ({
                message: "Invalid book ID"
            });
        }

        const book = await Book.findbyId(id);
        if (!book) {
            return res.status(404).json ({
                message: "Book not found"
            });
        }

        const response = {
            id: book._id,
            title: book.title,
            isbn: book.isbn,
            author: book.author,
            genre: book.genre,
            year: book.year,
            availability: {
                total: book.availability.total,
                available: book.availability.available
            },
            description: book.description,
            age: book.age,
            history: book.history.map(entry => ({
                username: entry.username,
                checkoutDate: formatDate(entry.checkoutDate),
                returnDate: formatDate(entry.returnDate)
            }))
        }; res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving book",
            error: err.message
        })
    }


    res.json({
        message: `book id ${req.params.id} retreived`
    });
};