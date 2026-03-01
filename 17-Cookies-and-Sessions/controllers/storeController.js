const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getHome = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("store/home-list", {
      registeredHome,
      pageTitle: "My Homes",
      currentPage: "Home",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

const index = (req, res, next) => {
  console.log("Session value: ", req.session);
  Home.find().then((registeredHome) => {
    res.render("store/index", {
      registeredHome,
      pageTitle: "Home",
      currentPage: "index",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
  //res.sendFile(path.join(rootDir, "views", "home.html"));
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId") // it'll just store the id of the house in the favourite collection, but with populate, it will fetch the whole house details and store it in the houseId field of the favourite collection.
    .then((favourite) => {
      favouriteHomes = favourite
        .filter((fav) => fav.houseId)
        .map((fav) => fav.houseId);

      res.render("store/favourite-list", {
        favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourite-list",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((exist) => {
      if (exist) {
        return res.redirect("/favourite-list");
      }
      const fav = new Favourite({ houseId: homeId });
      fav
        .save()
        .then((result) => {
          console.log("Favourite added:", result);
        })
        .then(() => {
          res.redirect("/favourite-list");
        });
    })
    .catch((err) => {
      console.log("Error while adding to favourite: ", err);
      res.redirect("/favourite-list");
    });
};

exports.deleteFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Detected ", homeId);
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("Delete favourite: ", result);
    })
    .catch((err) => {
      console.log("Error while deleting favourites", err);
    })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(`At home details page, ${homeId}`);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/home");
    } else {
      console.log("Home details found ", home);

      res.render("store/home-details", {
        home,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn: req.session.isLoggedIn,
      });
    }
  });
};

exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.getFavouriteList = getFavouriteList;
exports.index = index;
