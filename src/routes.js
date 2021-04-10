const express = require("express");
const mongoose = require("mongoose");
const Crime = require("./models/Crime");
const router = express.Router();

// Gets all crimes
router.get('/crimes', async(req, res) => {
    try {
        const crimes = await Crime.find();
        res.send(crimes);
    } catch {
        res.status(404);
        res.send({error: "Get request for all crimes resulted in error"});
    }
    
});

// Getting a specific crime
router.get("/crimes/:id", async (req, res) => {
    try {
        const crime = await Crime.findOne( {_id : req.params.id});
        res.send(crime);
    } catch {
        res.status(404);
        res.send({error: "Get request for a single crime resulted in error"});
    }
});

// Create a new crime report
/*
router.post("/crimes", async (req, res) => {
    try {
        const crime = new Crime({
            CaseID : req.body.CaseID,
            DateReported : req.body.DateReported,
            TimeReported : req.body.TimeReported,
            DateOccurred : req.body.DateOccurred,
            TimeOccurred : req.body.TimeOccurred,
            Latitude : req.body.Latitude,
            Longitude : req.body.Longitude,
            StreetAddress : req.body.StreetAddress,
            Description : req.body.Description,
            Disposition : req.body.Disposition
        });
        
        await crime.save();
        res.send(crime);
    } catch {
        res.status(404);
        res.send({error: "Post request for a new crime resulted in error"});
    }
})
*/


module.exports = router;