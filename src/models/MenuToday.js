const mongoose = require('mongoose');

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

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  name: String,
  isItVeg: Boolean,
  measurement: String,
  quantity: Number,
  unit: String,
  price: Number,
  imageURL: String,
  hasDiscount: Boolean,
  discountPercentage: Number,
  isSpecialToday: Boolean,
  quantityToday: Number,
  soldQuantity: Number
});

module.exports = mongoose.model('todaymenuitem', MenuSchema, 'todaymenuitems');