const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
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

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

const getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourite) => {
    Home.fetchAll((registeredHome) => {
      const favouriteHomes = registeredHome.filter((home) =>
        favourite.includes(home.id)
      );
      res.render("store/favourite-list", {
        favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourite-list",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  console.log("Add to favourite ", req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error: ", error);
    }
    res.redirect("/favourite-list");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(`At home details page, ${homeId}`);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/home");
    } else {
      console.log("Home details found ", home);

      res.render("store/home-details", {
        home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
};

exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.getFavouriteList = getFavouriteList;
exports.index = index;
