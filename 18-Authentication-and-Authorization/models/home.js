const mongoose = require("mongoose");
const Favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: String,
  description: String,
});

homeSchema.pre("findOneAndDelete", async function () {
  console.log("Pre hook for deleting home is called");
  const homeId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId: homeId });
});

module.exports = mongoose.model("Home", homeSchema); // this creates a class named "Home" and it is based on the homeSchema. It also creates a collection named "homes" in the database. The collection name is the plural form of the model name (Home -> Homes).

/**
 * 
 * this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
 * save()
 * find()
 * findById(homeId)
 * deleteById(homeId)
 */
