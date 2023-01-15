const mongoose = require("mongoose");
const path = require("path");
import { MONGODB_URI } from "./config";
// require("dotenv").config({ path: __dirname + "/config/.env" });

// console.log(process.env.MONGODB_URI)

mongoose.connect(MONGODB_URI, () => {
  console.log("Conectado a MongoDB");
});
