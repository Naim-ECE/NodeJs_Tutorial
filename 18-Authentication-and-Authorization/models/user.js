const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters long"],
  },
  userType: {
    type: String,
    enum: ["host", "guest"],
    default: "guest",
    required: [true, "User type is required"],
  },
});

module.exports = mongoose.model("User", userSchema);
