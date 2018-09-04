const express = require("express");

const app = express();
const port = 5000;

app.get("/permissions", (req, res) => {
  res.send({ express: "Hello from express" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
