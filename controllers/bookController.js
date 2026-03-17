const Book = require("../models/Book");
const Author = require("../models/Author");
const mongoose = require("mongoose");

function formatDate(dateValue) {
    if (!dateValue) return null;
    return new Date(dateValue).toISOString().split("T")[0];
}

function buildAuthorName(dbAuthor) {
    return `${dbAuthor.firstName} ${dbAuthor.lastName}`;
}

exports.getAllbooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ title: 1 });

        const response = {
            books: books.map(book => ({
                id: book._id,
                title: book.title,
                author: book.author,
                available: book.availability.available > 0
            }))
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            message: "Error retrieving books",
            error: err.message
        });
    }
};

exports.createBook = async (req, res) => {
    try {
        const {
            title,
            isbn,
            authorId,
            genre,
            year,
            availability,
            description,
            age
        } = req.body;

        if (!title || !isbn || !authorId) {
            return res.status(400).json({
                message: "title, isbn and authorId details are required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({
                message: "Invalid authorId"
            });
        }

        const author = await Author.findById(authorId);

        if (!author) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        const authorName = buildAuthorName(author);
        const totalCopies = availability?.total ?? 1;

        const newBook = new Book({
            title,
            isbn,
            authorId,
            author: authorName,
            genre,
            year,
            description,
            age,
            availability: {
                total: totalCopies,
                available: totalCopies
            }
        });

        const savedBook = await newBook.save();

        const response = {
            id: savedBook._id,
            title: savedBook.title,
            isbn: savedBook.isbn,
            author: savedBook.author,
            genre: savedBook.genre,
            year: savedBook.year,
            description: savedBook.description,
            age: savedBook.age,
            availability: savedBook.availability,
            history: []
        };

        return res.status(201).json(response);

    } catch (err) {
        return res.status(400).json({
            message: "Error creating book",
            error: err.message
        });
    }
};

exports.deleteBook = (req, res) => {
    return res.status(200).json({
        message: "Book deleted"
    });
};

exports.updateBook = (req, res) => {
    return res.json({
        message: `book id ${req.params.id} updated`
    });
};

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
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
                userName: entry.userName,
                checkoutDate: formatDate(entry.checkoutDate),
                returnDate: formatDate(entry.returnDate)
            }))
        };

        return res.status(200).json(response);

    } catch (err) {
        return res.status(500).json({
            message: "Error retrieving book",
            error: err.message
        });
    }
};