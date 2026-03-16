const Home = require("../models/home");
const user = require("../models/user");
const fs = require("fs");

const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "Addhome",
    isLoggedIn: req.session.isLoggedIn,
    editing: false,
    user: req.session.user,
  });
};

const postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);
  console.log("File: ", req.file); // this is the file object created by multer middleware. It contains the details of the uploaded file, including the path where it is stored on the server.

  if (!req.file) {
    console.log("No file uploaded");
    return res
      .status(400)
      .send("No image file uploaded. Please upload a jpg, jpeg, or png file.");
  }

  const photo = req.file.path; // Store the file path of the uploaded image in the database. This path can be used to serve the image later.

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });

  home.save().then(() => {
    console.log("home added successfully");
  });

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "Homeadded",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
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
      isLoggedIn: req.session.isLoggedIn,
      editing: editing,
      home: home,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error while deleting old image: ", err);
          } else {
            console.log("Old image deleted successfully");
          }
        });

        home.photo = req.file.path; // Update the photo path with the new uploaded image
      }

      home
        .save()
        .then((result) => {
          console.log("Home updated: ", result);
        })
        .catch((err) => {
          console.log("Error while updating home: ", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while finding home: ", err);
      res.redirect("/host/host-home-list");
    });
};

const getHostHome = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome,
      pageTitle: "Host Homes List",
      currentPage: "host-home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleted ", homeId);
  Home.findByIdAndDelete(homeId)
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
