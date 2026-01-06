// core modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const favouriteDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already existed to favourites");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
};
