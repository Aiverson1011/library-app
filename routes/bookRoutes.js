const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

const {
  ensureAuthenticated,
  requireRole
} = require("../middleware/authMiddleware");

router.get("/", ensureAuthenticated, bookController.getAllbooks);
router.get("/:id", ensureAuthenticated, bookController.getBookById);

router.post("/", ensureAuthenticated, requireRole("librarian"), bookController.createBook);
router.put("/:id", ensureAuthenticated, requireRole("librarian"), bookController.updateBook);
router.delete("/:id", ensureAuthenticated, requireRole("librarian"), bookController.deleteBook);

module.exports = router;