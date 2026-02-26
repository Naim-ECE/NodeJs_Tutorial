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
  res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogOut = (req, res, next) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/");
};
