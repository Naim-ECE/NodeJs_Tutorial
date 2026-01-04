const express = require("express");
const storeRouter = express.Router();
const {
  getHome,
  getBookings,
  getFavouriteList,
  index,
  getHomeDetails,
} = require("../controllers/storeController");

storeRouter.get("/", index);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourite-list", getFavouriteList);
storeRouter.get("/home/:homeId", getHomeDetails);

module.exports = storeRouter;
