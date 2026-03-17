const mongoose = require("mongoose");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ lastName: 1, firstName: 1 });

    const response = {
      users: users.map(user => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }))
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving users",
      error: err.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving user",
      error: err.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: "firstName, lastName, and email are required"
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email
    });

    const savedUser = await newUser.save();

    const response = {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email
    };

    return res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({
      message: "Error creating user",
      error: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error updating user",
      error: err.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting user",
      error: err.message
    });
  }
};