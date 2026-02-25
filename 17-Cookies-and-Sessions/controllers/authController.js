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
  req.isLoggedIn = true;
  res.redirect("/");
}
