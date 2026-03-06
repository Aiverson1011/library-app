const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllbooks);

router.post("/", bookController.createBook);

router.delete("/:id", bookController.deleteBook);

router.put("/:id", bookController.updateBook);

router.get("/:id", bookController.getBookById);

module.exports = router;