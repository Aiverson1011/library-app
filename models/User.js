const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["member", "librarian"],
      default: "member"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);