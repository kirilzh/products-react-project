const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

app.get("/permissions", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "data/permissions.json"));
});

app.get("/products", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "data/products.json"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
