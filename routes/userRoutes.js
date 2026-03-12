const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("../auth/passport");

router.post("/signup", userController.signUp);

router.post("/login",
    passport.authenticate("local",{
        successRedirect: "/protected",
        failureRedirect: "/login"
    })    
)


module.exports = router