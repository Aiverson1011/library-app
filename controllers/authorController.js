const author = require("../models/Author");

exports.getAllAuthors = (req, res) => {
    res.json({
        message: "Retreiving all the authors"
    });
};

exports.getAuthorById = (req, res) => {
    res.status(200).json({
        message: `Author id ${req.params.id} retreived`
    });
};

exports.createNewAuthor = (req, res) => {
    res.status(201).json({
        message: "Author created"
    });
};

exports.updateAuthor = (req, res) => {
    res.json({
        message: ` Author id ${req.params.id} updated`
    });
};

exports.deleteAuthor = (req, res) => {
    res.status(200).json({
        message: `Author id ${req.params.id} deleted`
    });
};