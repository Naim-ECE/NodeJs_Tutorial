const Home = require("../models/home");

const getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home", currentPage: "Addhome" });
};

const postAddHome = (req, res, next) => {
  console.log(req.body);

  const { houseName, price, location, rating, photo } = req.body;
  const home = new Home(houseName, price, location, rating, photo);

  home.save();

  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "Homeadded",
  });
};

const getHome = (req, res, next) => {
  const registeredHome = Home.fetchAll((registeredHome) => {
    res.render("home", {
      registeredHome,
      pageTitle: "Home Rent Website",
      currentPage: "Home",
    });
  });
  //res.sendFile(path.join(rootDir, "views", "home.html"));
};

exports.getAddHome = getAddHome;
exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.postAddHome = postAddHome;
