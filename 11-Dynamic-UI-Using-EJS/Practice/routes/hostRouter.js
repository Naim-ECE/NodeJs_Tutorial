const express = require("express");
const hostRouter = express.Router();

const path = require("path");

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home", currentPage: "Addhome" });
});

const registeredHome = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(
    req.body,
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photo
  );
  registeredHome.push({
    houseName: req.body.houseName,
    price: req.body.price,
    location: req.body.location,
    rating: req.body.rating,
    photo: req.body.photo,
  });
  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "Homeadded"
  });
});

exports.hostRouter = hostRouter;
exports.registeredHome = registeredHome;
