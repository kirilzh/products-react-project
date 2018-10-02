const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const CONFIG = require("./config");
require("./models/Product");
require("./models/Permission");
require("./models/Validation");

const app = express();
app.use(bodyParser.json());
const port = 5000;

mongoose.connect(`mongodb://${CONFIG.USER}:${CONFIG.PASSWORD}@ds251332.mlab.com:51332/sg-task`);

const Product = mongoose.model("products");
const Permission = mongoose.model("permissions");
const Validation = mongoose.model("validations");

// get all permissions
app.get("/permissions", (req, res) => {
  Permission.find({}, (err, permissions) => {
    return res.json(permissions);
  });
});

// get all validations
app.get("/validations", (req, res) => {
  Validation.find({}, (err, validations) => {
    return res.json(validations);
  })
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


app.listen(port, () => console.log(`Listening on port ${port}`));
