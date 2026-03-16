const Home = require("../models/home");
const User = require("../models/user");
const path = require("path");
const rootDir = path.dirname(require.main.filename);

const getHome = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("store/home-list", {
      registeredHome,
      pageTitle: "My Homes",
      currentPage: "Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
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
      user: req.session.user,
    });
  });
  //res.sendFile(path.join(rootDir, "views", "home.html"));
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

const getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourite");
  console.log("User with populated favourites: ", user);

  res.render("store/favourite-list", {
    favouriteHomes: user.favourite, // this is the array of favourite homes of the user. It is populated with the details of the homes.
    pageTitle: "My Favourites",
    currentPage: "favourite-list",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (!user.favourite.includes(homeId)) {
    user.favourite.push(homeId);
    await user.save();
  }

  res.redirect("/favourite-list");
};

exports.deleteFavouriteList = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (user.favourite.includes(homeId)) {
    user.favourite.pull(homeId); // pull is a mongoose method to remove an item from an array. It removes the item from the array if it exists. If the item does not exist, it does nothing.
    await user.save();
  }

  res.redirect("/favourite-list");
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
        user: req.session.user,
      });
    }
  });
};

exports.getHouseRules = [
  (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    }
    next();
  },
  (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then((home) => {
      if (!home) {
        console.log("Home not found");
        res.redirect("/home");
      } else {
        console.log("Home details found ", home);
        const rulesFileName = "House_Rules.pdf";
        const filePath = path.join(rootDir, "rules", rulesFileName);
        res.download(filePath, "House_Rules.pdf", (err) => {
          if (err) {
            console.log("Error downloading file: ", err);
            res.status(500).send("Error downloading file");
          }
        });
      }
    });
  },
];

exports.registeredHome = this.registeredHome;
exports.getHome = getHome;
exports.getFavouriteList = getFavouriteList;
exports.index = index;
