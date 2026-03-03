exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    editing: false,
  });
};

exports.postLogin = (req, res, next) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // req.session.isLoggedIn = true;
  res.redirect("/");
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
  });
};

exports.postSignUp = (req, res, next) => {
  console.log(req.body);
  // Here you would typically save the user data to a database
  // For this example, we'll just redirect to the login page after "signing up"
  res.redirect("/login");
};
