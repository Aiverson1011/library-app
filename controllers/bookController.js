exports.getAllbooks = (req, res) => {
    res.json({message: "retreving all books"});
};

exports.createBook = (req, res) => {
    res.status(201).json({
        message: "Created the book",
        data: req.body
    });
};