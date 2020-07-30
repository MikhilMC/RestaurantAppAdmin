const express = require('express');
const mongoose = require('mongoose');
const FoodItems = require('../models/FoodItems');

const addItemRouter = express.Router();

const mongoURI = "mongodb://127.0.0.1:27017/Restaurant";

mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to DB');
    }
  }
);

function router(nav) {

  addItemRouter.get('/', (req, res) => {
    FoodItems.find({}, (err, foodItems) => {
      if (err) {
        console.log(err);
      } else if(!foodItems || foodItems.length === 0) {
        res.render('addItem', {
          title: "Add Food Item",
          nav,
          hasAnythingAdded: false,
          foodItems : []
        });
      } else {
        res.render('addItem', {
          title: 'Add Food Item',
          nav,
          hasAnythingAdded: true,
          foodItems
        });
      }
    });
  });

  addItemRouter.post('/', (req, res) => {
    let newFoodData = {};
    newFoodData.name = req.body.name;
    if (req.body.isItVeg === 'yes') {
      newFoodData.isItVeg = true;
    } else {
      newFoodData.isItVeg = false;
    }
    newFoodData.measurement = req.body.measurement;
    newFoodData.quantity = req.body.quantity;
    newFoodData.unit = req.body.unit;
    newFoodData.price = req.body.price;
    newFoodData.imageURL = req.body.imageURL;
    let newFood = new FoodItems(newFoodData);
    newFood.save((err, foodItem) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foodItem);
        res.redirect('/add-item');
      }
    });
  });

  return addItemRouter;
}

module.exports = router;
