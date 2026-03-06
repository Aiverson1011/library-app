const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.get("/", loanController.getAllLoans);

router.patch("/:id/return", loanController.returnBook);

router.post("/", loanController.addLoan);

module.exports = router;