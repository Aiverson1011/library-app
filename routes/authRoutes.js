const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed"
      });
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);

      return res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });
    });
  })(req, res, next);
});

router.post("/logout", authController.logout);
router.get("/me", authController.me);

module.exports = router;