const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const {
  ensureAuthenticated,
  requireRole
} = require("../middleware/authMiddleware");

router.get("/", ensureAuthenticated, authorController.getAllAuthors);
router.get("/:id", ensureAuthenticated, authorController.getAuthorById);

router.post("/", ensureAuthenticated, requireRole("librarian"), authorController.createAuthor);
router.put("/:id", ensureAuthenticated, requireRole("librarian"), authorController.updateAuthor);
router.delete("/:id", ensureAuthenticated, requireRole("librarian"), authorController.deleteAuthor);

module.exports = router;