const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");



mongoose.connect(
 "mongodb+srv://aaronyu:tlKbPr4so2GFkMaA@uiuccrimedatabase.vg06i.mongodb.net/Crime-DB?retryWrites=true&w=majority",
 {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
    const app = express();
    app.use(cors());
    app.use("/api", routes);
    app.use(express.json());

    app.listen(process.env.PORT || 5000, () => {
        console.log("server running...");
    })
 }).catch(err => console.log(err));
