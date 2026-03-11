const mongoose = require("mongoose");

const historySchema = new mongoose.Schema ({
    userName: {
        type: String,
        required: true,
        trim: true
    },

    checkoutDate: {
        type: Date,
        required: true
    },

    returnDate :{
        type: Date,
        required: true
    },

}, {_id: false});

const availabilitySchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    },

    available: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    },
}, {_id: false});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },

    genre: {
        type: String,
        trim: true
    },

    year: {
        type: Number,
        min: 0
    },

    description: {
        type: String,
        trim: true
    },

    age: {
        type: Number,
        min: 0
    },

    availability: {
        type: availabilitySchema,
        default: () => ({
            total: 1,
            available: 1
        })
    },  
    
    history: {
        type: [historySchema],
        default: []
    },
},
{timestamps: true});

module.exports = mongoose.model("Book", bookSchema);