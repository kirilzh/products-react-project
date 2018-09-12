const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionSchema = new Schema({
  name: String,
  visible: Boolean
});

mongoose.model("permissions", permissionSchema);
