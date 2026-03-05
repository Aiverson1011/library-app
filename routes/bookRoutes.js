const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllbooks);

router.post("/", bookController.createBook);


module.exports = router;