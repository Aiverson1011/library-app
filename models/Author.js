const mongoose = require ("mongoose");

const authorSchema = new mongoose.Schema (
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
    dob: {
        type: Date,
        required: true
    }
   },
   {
    timestamps: true
   }
)