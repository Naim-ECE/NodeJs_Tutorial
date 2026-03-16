const express = require("express");
const storeRouter = express.Router();
const {
  getHome,
  getBookings,
  getFavouriteList,
  index,
  getHomeDetails,
  postAddToFavourite,
  deleteFavouriteList,
  getHouseRules,
} = require("../controllers/storeController");

storeRouter.get("/", index);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourite-list", getFavouriteList);
storeRouter.get("/home/:homeId", getHomeDetails);
storeRouter.post("/favourite-list", postAddToFavourite);
storeRouter.post("/delete-favourite-list/:homeId", deleteFavouriteList);
storeRouter.get("/rules/:homeId", getHouseRules);

module.exports = storeRouter;
