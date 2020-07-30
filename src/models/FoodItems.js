const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodItemsSchema = new Schema({
  name: String,
  isItVeg: Boolean,
  measurement: String,
  quantity: Number,
  unit: String,
  price: Number,
  imageURL: String
});

module.exports = mongoose.model('fooditem', FoodItemsSchema, 'fooditems');