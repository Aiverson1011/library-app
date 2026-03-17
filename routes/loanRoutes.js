const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.post("/", loanController.createLoan);
router.get("/", loanController.getLoans);
router.patch("/:id/return", loanController.returnLoan);

module.exports = router;