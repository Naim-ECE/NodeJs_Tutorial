// core modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { json } = require("stream/consumers");
// const { registeredHome } = require("../controllers/hostController");

module.exports = class Home {
  constructor(houseName, price, location, rating, photo) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
  }

  // save = () => {}; // instance property -> 2 objects points to 2 save()'s

  // prototype -> 2 objects points to only save()
  save() {
    Home.fetchAll((registeredHome) => {
      registeredHome.push(this);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHome), (error) => {
        console.log(`File writing concluded ${error}`);
      });
    });
  }

  // all files can access registered home by this function
  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback(registeredHome);
      }
    });
  }
};
