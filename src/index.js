const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require('dotenv').config();


mongoose.connect(
 process.env.MONGODB_KEY,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
    const app = express();
    app.use(cors());
    app.use("/api", routes);
    app.use(express.json());

    app.listen(5000, () => {
        console.log("server running...");
    })
 }).catch(err => console.log(err));
