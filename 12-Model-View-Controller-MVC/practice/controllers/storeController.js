const Home = require("../models/home");

const getHome = (req, res, next) => {
  const registeredHome = Home.fetchAll((registeredHome) => {
    res.render("store/home-list", {
      registeredHome,
      pageTitle: "My Homes",
      currentPage: "Home",
    });
  });
  //res.sendFile(path.join(rootDir, "views", "home.html"));
};

const index = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    res.render("store/index", {
      registeredHome,
      pageTitle: "Home",
      currentPage: "index",
    });
  });
  //res.sendFile(path.join(rootDir, "views", "home.html"));
};

const getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

const getFavouriteList = (req, res, next) => {
  res.render("store/favourite-list", {
    pageTitle: "My Favourites",
    currentPage: "favourite-list",
  });
};

exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.getBookings = getBookings;
exports.getFavouriteList = getFavouriteList;
exports.index = index;
