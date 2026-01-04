const  Home = require("../models/home");

const getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Add Home", currentPage: "Addhome" });
};


const postAddHome = (req, res, next) => {
  console.log(req.body);

  const { houseName, price, location, rating, photo } = req.body;
  const home = new Home(houseName, price, location, rating, photo);

  home.save();
  
  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "Homeadded",
  });
};

const getHostHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome,
      pageTitle: "Host Homes List",
      currentPage: "host-home",
    });
  });
};

exports.getAddHome = getAddHome;
exports.postAddHome = postAddHome;
exports.getHostHome = getHostHome;
