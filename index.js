const express = require("express");
const mongoose = require("mongoose");
const routes = require("./api/routes");
const cors = require("cors");
const path = require('path');
var compress = require('compression');
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
    app.use(compress()); 

    // Serve up our react app

    // serves the built version of your react app
    app.use(express.static(path.join(__dirname, 'mapclient/build'), {maxAge: '1d'}))
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/mapclient/build/index.html'))
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log("server running...");
    })
 }).catch(err => console.log(err));
