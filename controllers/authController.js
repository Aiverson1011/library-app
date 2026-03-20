const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      role
    } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email, username, and password are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with that email or username already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      passwordHash,
      role: role || "member"
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      username: savedUser.username,
      role: savedUser.role
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error signing up",
      error: err.message
    });
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((sessionErr) => {
      if (sessionErr) return next(sessionErr);

      res.clearCookie("connect.sid");
      return res.status(200).json({
        message: "Logged out successfully"
      });
    });
  });
};

exports.me = (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not authenticated"
    });
  }

  return res.status(200).json({
    user:  {
      id: req.user._id ? req.user._id.toString() : req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
};