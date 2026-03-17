const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    checkOutDate: {
      type: Date,
      default: Date.now
    },

    dueDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Loan", loanSchema);