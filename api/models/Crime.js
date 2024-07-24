const mongoose = require("mongoose");

const schema = mongoose.Schema({
    CaseID : String,
    DateReported : Date,
    TimeReported : String,
    DateOccurred : Date,
    TimeOccurred : String,
    Latitude : Number,
    Longitude : Number,
    StreetAddress : String,
    Description : String,
    Disposition : String
},
// Used to specify collection name in MongoDB
{
    collection : "Crime-Data-Date"
});

module.exports = mongoose.model("Crimes", schema);