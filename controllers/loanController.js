exports.getAllLoans = (req, res) => {
    res.json ({
        message: "Retrieving all loans"
    });
};

exports.returnBook = (req, res) => {
    res.json ({
        message: `Book id ${req.params.id} returned`
    });
};

exports.addLoan = (req, res) => {
    res.status(201).json({
        message: "Loan added"
    });
};