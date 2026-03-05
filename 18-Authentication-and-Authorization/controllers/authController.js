const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    editing: false,
  });
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while logging out: ", err);
    }
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up to HomeRnt",
    currentPage: "Sign Up",
    isLoggedIn: false,
    editing: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
  });
};

exports.postSignUp = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[A-Za-z]+$/) // '+' means "one or more letters"
    .withMessage("First name must contain only letters"),

  check("lastName")
    .matches(/^[A-Za-z]*$/) // '*' means "zero or more letters", allowing last name to be optional
    .withMessage("Last name must contain only letters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(), // 'normalizeEmail' will convert the email to lowercase and remove unnecessary characters

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .trim(), // 'trim' will remove leading and trailing whitespace from the password

  check("confirmedPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("User type must be either 'guest' or 'host'"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign Up to HomeRnt",
        currentPage: "Sign Up",
        isLoggedIn: false,
        editing: false,
        errors: errors.array().map((error) => error.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        console.log("User created successfully");
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error while creating user: ", err);
        res.status(500).render("auth/signup", {
          pageTitle: "Sign Up to HomeRnt",
          currentPage: "Sign Up",
          isLoggedIn: false,
          editing: false,
          errors: [
            "An error occurred while creating your account. Please try again.",
          ],
          oldInput: { firstName, lastName, email, userType },
        });
      });
  },
];

exports.postLogin = (req, res, next) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // req.session.isLoggedIn = true;
  res.redirect("/");
};
