const mongoose = require("mongoose");

const schema = mongoose.Schema({
    CaseID : String,
    DateReported : String,
    TimeReported : String,
    DateOccurred : String,
    TimeOccurred : String,
    Latitude : Number,
    Longitude : Number,
    StreetAddress : String,
    Description : String,
    Disposition : String
},
// Used to specify collection name in MongoDB
{
    collection : "Crime-Data"
});

module.exports = mongoose.model("Crimes", schema);