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
