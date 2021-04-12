const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

// POST /api/event/create-event
// Create a new event
router.post('/create-event', async (req, res) => {
    try{
        const newEvent = {
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            poster: req.body.poster,
        };

        const dataEvent = await Event.create(newEvent);

        return res.status(201).json({ data: dataEvent });
    } catch(err){
        console.error(err);
    }
});

module.exports = router; 