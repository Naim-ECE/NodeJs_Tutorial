const express = require("express");
const storeRouter = express.Router();
const {
  getHome,
  getBookings,
  getFavouriteList,
  index,
} = require("../controllers/storeController");

storeRouter.get("/", index);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourite-list", getFavouriteList);

module.exports = storeRouter;
