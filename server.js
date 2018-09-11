const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("./models/Product");
require("./models/Permission");

const app = express();
app.use(bodyParser.json());
const port = 5000;

mongoose.connect("mongodb://sguser:sguser.123@ds251332.mlab.com:51332/sg-task");

const Product = mongoose.model("products");
const Permission = mongoose.model("permissions");

// Product.findOne({ name: "SSD" }).then(existingProduct => {
//   if (existingProduct) {
//     // console.log(existingProduct);
//   } else {
//     new Product({ name: "SSD", price: 200, currency: "BGN" }).save();
//   }
// });

app.get("/permissions", (req, res) => {
  Permission.find({}, (err, permissions) => {
    return res.json(permissions);
  });
});

// get all products
app.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    return res.json(products);
  });
});

// create a product
app.post("/products", (req, res) => {
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    currency: req.body.currency
  });

  Product.findOne({ name: req.body.name }).then(existingProduct => {
    if (existingProduct) res.send("already exists");
    else {
      product.save().then(
        doc => {
          res.send(doc);
        },
        e => {
          res.status(400).send(e);
        }
      );
    }
  });
});

// update product
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const object = req.body.product;

  Product.findByIdAndUpdate(id, object, (err, object) => {
    if (err) res.json(err);
    res.json(object);
  });
});

// delete product
app.delete("/products/:id", (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) res.json(err);
    res.json(doc);
  });
});

app.get("/validation", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "data/validation.json"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
