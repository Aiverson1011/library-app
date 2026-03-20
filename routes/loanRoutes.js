const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const {
  ensureAuthenticated,
  requireRole
} = require("../middleware/authMiddleware");

router.post("/", ensureAuthenticated, loanController.createLoan);
router.get("/", ensureAuthenticated, requireRole("librarian"), loanController.getLoans);
router.patch("/:id/return", ensureAuthenticated, loanController.returnLoan);

module.exports = router;