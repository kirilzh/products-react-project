const mongoose = require("mongoose");
const { Schema } = mongoose;

const validationSchema = new Schema({
  name: String,
  expression: String
});

mongoose.model("validations", validationSchema);
