const express = require('express');
const FoodItems = require('../models/FoodItems');
const MenuToday = require('../models/MenuToday')

const createMenuRouter = express.Router()

function router(nav) {
  let menu = []

  createMenuRouter.get('/', (req, res) => {
    MenuToday.find({}, (error, menuItems) => {
      if (error) {
        console.log(error);
      } else if ((!menuItems || menuItems.length === 0) && menu.length === 0) {
        FoodItems.find({}, (err, foodItems) => {
          if (err) {
            console.log(err);
          } else {
            foodItems.forEach(item => {
              menu.push(item.name);
            });
            console.log(menu);

            res.render('createMenu', {
              nav,
              title: "Create Today's Menu",
              isAnyAvailable: false,
              menuItems: [],
              menu
            });            
          }
        });
        
      } else {
        FoodItems.find({}, (err, items) => {
          if (err) {
            console.log(err);
          } else {
            menu = [];
            items.forEach((item)=>{
              menu.push(item.name)
            })
            console.log(menu)
            res.render('createMenu', {
              nav,
              title: "Create Today's Menu",
              isAnyAvailable: true,
              menuItems,
              menu
            });            
          }
        });
        
      }
    });
  });

  createMenuRouter.post('/', (req, res) => {
    FoodItems.findOne({ name: req.body.name }, 'name isItVeg measurement quantity unit price imageURL -_id', (err, item) => {
      if (err) {
        console.log(err);
      } else {
        let newItem = {};
        let pos;
        for (let i = 0; i < menu.length; i++) {
          if (menu[i] === req.body.name) {
            pos = i;
            break;
          }
        }
        menu.splice(pos, 1);
        newItem.name = item.name;
        newItem.isItVeg = item.isItVeg;
        newItem.measurement = item.measurement;
        newItem.quantity = item.quantity;
        newItem.unit = item.unit;
        newItem.price = item.price;
        newItem.imageURL = item.imageURL;
        if (req.body.hasDiscount === 'yes') {
          newItem.hasDiscount = true;
          newItem.discountPercentage = req.body.discountPercentage;
        } else {
          newItem.hasDiscount = false;
          newItem.discountPercentage = 0;
        }
        if (req.body.isSpecialToday === 'yes') {
          newItem.isSpecialToday = true;
        } else {
          newItem.isSpecialToday = false;
        }
        newItem.quantityToday = req.body.quantityToday;
        newItem.soldQuantity = 0;
        let food = new MenuToday(newItem);
        food.save((error, foodItem) => {
          if (error) {
            console.log(error);
          } else {
            console.log(foodItem);
            res.redirect('/create-menu')
          }
        });
      }
    });
  });

  return createMenuRouter;
}

module.exports = router
