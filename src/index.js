const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require('dotenv').config();


mongoose.connect(
 process.env.MONGODB_KEY,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
     const app = express();
     app.use("/api", routes);
     
     app.listen(5000, () => {
         console.log("server running...");
     })
 }).catch(err => console.log(err));
