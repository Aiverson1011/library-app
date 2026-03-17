const mongoose = require("mongoose");
const Author = require("../models/Author");
const Book = require("../models/Book");

function formatDate(dateValue) {
  if (!dateValue) return null;
  return new Date(dateValue).toISOString().split("T")[0];
}

// GET /authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ lastName: 1, firstName: 1 });

    const response = {
      authors: authors.map((author) => ({
        id: author._id,
        firstName: author.firstName,
        lastName: author.lastName,
        dob: formatDate(author.dob)
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving authors",
      error: error.message
    });
  }
};

// GET /authors/:id
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid author ID"
      });
    }

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    const books = await Book.find({ authorId: id }).sort({ title: 1 });

    const response = {
      id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      dob: formatDate(author.dob),
      uniqueQuantity: books.length,
      books: books.map((book) => ({
        id: book._id,
        title: book.title,
        year: book.year
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving author",
      error: error.message
    });
  }
};

// POST /authors
exports.createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;

    if (!firstName || !lastName || !dob) {
      return res.status(400).json({
        message: "firstName, lastName, and dob are required"
      });
    }

    const newAuthor = new Author({
      firstName,
      lastName,
      dob
    });

    const savedAuthor = await newAuthor.save();

    const response = {
      id: savedAuthor._id,
      firstName: savedAuthor.firstName,
      lastName: savedAuthor.lastName,
      dob: formatDate(savedAuthor.dob)
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Error creating author",
      error: error.message
    });
  }
};

// PUT /authors/:id
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dob } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid author ID"
      });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dob
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedAuthor) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    res.status(200).json({
      message: "Author updated successfully",
      author: {
        id: updatedAuthor._id,
        firstName: updatedAuthor.firstName,
        lastName: updatedAuthor.lastName,
        dob: formatDate(updatedAuthor.dob)
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating author",
      error: error.message
    });
  }
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid author ID"
      });
    }

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error deleting author",
      error: error.message
    });
  }
};