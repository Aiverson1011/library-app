const mongoose = require("mongoose");
const Loan = require("../models/Loan");
const Book = require("../models/Book");
const User = require("../models/User");

/*
POST /loans
Checkout a book
*/
exports.createLoan = async (req, res) => {
  try {
    const { bookId, userId, dueDate } = req.body;

    // validation
    if (!bookId || !userId || !dueDate) {
      return res.status(400).json({
        message: "bookId, userId, and dueDate are required"
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(bookId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        message: "Invalid bookId or userId"
      });
    }

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // availability check
    if (book.availability.available <= 0) {
      return res.status(400).json({
        message: "No copies available"
      });
    }

    const newLoan = new Loan({
      bookId,
      userId,
      dueDate
    });

    const savedLoan = await newLoan.save();

    // update book availability
    book.availability.available -= 1;
    await book.save();

    return res.status(201).json({
      id: savedLoan._id,
      bookId: savedLoan.bookId,
      userId: savedLoan.userId,
      checkOutDate: savedLoan.checkOutDate,
      dueDate: savedLoan.dueDate,
      returnDate: savedLoan.returnDate
    });

  } catch (err) {
    return res.status(400).json({
      message: "Error creating loan",
      error: err.message
    });
  }
};

/*
GET /loans
List all loans
*/
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();

    const response = {
      loans: loans.map(loan => ({
        id: loan._id,
        bookId: loan.bookId,
        userId: loan.userId,
        checkOutDate: loan.checkOutDate,
        dueDate: loan.dueDate,
        returnDate: loan.returnDate
      }))
    };

    return res.status(200).json(response);

  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving loans",
      error: err.message
    });
  }
};

/*
PATCH /loans/:id/return
Return a book
*/
exports.returnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid loan ID"
      });
    }

    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    if (loan.returnDate) {
      return res.status(400).json({
        message: "Book already returned"
      });
    }

    loan.returnDate = new Date();
    await loan.save();

    // update book availability
    const book = await Book.findById(loan.bookId);
    book.availability.available += 1;
    await book.save();

    return res.status(200).json({
      message: "Book returned",
      returnDate: loan.returnDate
    });

  } catch (err) {
    return res.status(500).json({
      message: "Error returning book",
      error: err.message
    });
  }
};