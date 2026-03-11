const Book = require("../models/Book");
const Author = require("../models/Author");
const mongoose = require("mongoose");

function formatDate(dateValue) {
    if (!dateValue) return null;
    return new Date(dateValue).toISOString().split("T")[0];
};

function buildAuthorName(dbAuthor){
    return `${dbAuthor.firstName} ${dbAuthor.lastName}`;
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
    try{
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
        if(!title || !isbn || !authorId){
            res.status(400).json({
                message: "title, isbn and authorId details are required"
            });
        };

        if(!mongoose.Types.ObjectId.isValid(authorId)){
            res.status(400).json({
                message: "authorId not found"
            });
        };

        const author = await Author.findbyId(authorId);
        if (!author){
            res.status(404).json({
                message: "Author not found"
            });
        };

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

        res.status(201).json(response);

    }catch(err){
        res.status(400).json({
            message: "Error creating book"
        });
    };
   
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