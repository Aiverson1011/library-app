exports.getAllbooks = (req, res) => {
    res.json({message: "retreving all books"});
};

exports.createBook = (req, res) => {
    res.status(201).json({
        message: "Created the book",
        data: req.body
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

exports.getBookById = (req, res) => {
    res.json({
        message: `book id ${req.params.id} retreived`
    });
};