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

  const { houseName, price, location, rating, photo, description } = req.body;
  const home = new Home(houseName, price, location, rating, photo, description);

  home.save().then(() => {
    console.log("home added successfully");
  });

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "Homeadded",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
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
  const { id, houseName, price, location, rating, photo, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photo,
    description,
    id,
  );

  home
    .save()
    .then((result) => {
      console.log("Home updated: ", result);
    })
    .catch((err) => {
      console.log("Error occurred");
    });

  res.redirect("/host/host-home-list");
};

const getHostHome = (req, res, next) => {
  Home.fetchAll().then((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome,
      pageTitle: "Host Homes List",
      currentPage: "host-home",
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleted ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log(`Error while deleting ${error}`);
    });
};

exports.getAddHome = getAddHome;
exports.postAddHome = postAddHome;
exports.getHostHome = getHostHome;
