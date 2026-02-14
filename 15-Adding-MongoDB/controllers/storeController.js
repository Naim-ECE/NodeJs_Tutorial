const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getHome = (req, res, next) => {
  Home.fetchAll().then((registeredHome) => {
    res.render("store/home-list", {
      registeredHome,
      pageTitle: "My Homes",
      currentPage: "Home",
    });
  });
};

const index = (req, res, next) => {
  Home.fetchAll().then((registeredHome) => {
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
  Favourite.getFavourite().then((favourite) => {
    favourite = favourite.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHome) => {
      const favouriteHomes = registeredHome.filter((home) =>
        favourite.includes(home._id.toString()),
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
  const homeId = req.body.id;
  const fav = new Favourite(homeId);

  fav
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};

exports.deleteFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Detected ", homeId);
  Favourite.deleteFavourite(homeId)
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
      });
    }
  });
};

exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.getFavouriteList = getFavouriteList;
exports.index = index;
