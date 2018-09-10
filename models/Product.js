const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  currency: String
});

mongoose.model("products", productSchema);
