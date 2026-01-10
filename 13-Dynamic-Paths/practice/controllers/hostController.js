const Home = require("../models/home");

const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "Addhome",
    editing: false,
  });
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

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log(`Home not found`);
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      pageTitle: "Edit Your Home",
      currentPage: "host-home",
      editing: editing,
      home: home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photo } = req.body;
  const home = new Home(houseName, price, location, rating, photo);

  home.id = id;

  home.save();

  res.redirect("/host/host-home-list");
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
