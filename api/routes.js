const express = require("express");
const mongoose = require("mongoose");
const Crime = require("./models/Crime");
const router = express.Router();

// Gets all crimes
router.get('/crimes', async(req, res) => {
    try {
        const days = parseInt(req.query.days, 10);

        let query = {};

        // If 'days' is provided and is a valid number, add the date filter to the query
        if (!isNaN(days) && days > 0) {
            const dateThreshold = new Date(new Date() - days * 24 * 60 * 60 * 1000);
            query = {
                $or: [
                    { DateOccurred: { $gte: dateThreshold } },
                    { DateReported: { $gte: dateThreshold } }
                ]
            };
        }

        const crimes = await Crime.find(query);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(crimes);
    } catch {
        res.status(404);
        res.send({error: "Get request for all crimes resulted in error"});
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