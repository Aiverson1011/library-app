const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  ensureAuthenticated,
  requireRole
} = require("../middleware/authMiddleware");

router.get("/", ensureAuthenticated, requireRole("librarian"), userController.getAllUsers);
router.get("/:id", ensureAuthenticated, userController.getUserById);
router.post("/", ensureAuthenticated, requireRole("librarian"), userController.createUser);
router.put("/:id", ensureAuthenticated, requireRole("librarian"), userController.updateUser);
router.delete("/:id", ensureAuthenticated, requireRole("librarian"), userController.deleteUser);

module.exports = router;