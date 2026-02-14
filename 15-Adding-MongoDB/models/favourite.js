const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((exist) => {
        if (exist) {
          return;
        }
        return db.collection("favourites").insertOne(this);
      });
    //     updateOne(
    // { houseId: this.houseId },
    // { $set: { houseId: this.houseId } },
    // { upsert: true }
    // )
  }

  static getFavourite(callback) {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteFavourite(homeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ houseId: homeId });
  }
};
