const express = require('express');
const Place = require('../models/Places');


const CreatePlace = async (req, res) => {
    try {
        const venue = req.body.venue || {};
        const coordinates = venue.coordinates || {};
        const timing = req.body.timing || {};

        
        const newPlace = new Place({
            image: req.body.image,
            type: req.body.type,
            name: req.body.name,
            rankingPosition: req.body.rankingPosition,
            priceLevel: req.body.priceLevel,
            category: req.body.category,
            rating: req.body.rating,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email || null,  // Handling null email
            webUrl: req.body.webUrl,
            website: req.body.website,
            rankingDenominator: req.body.rankingDenominator,
            rankingString: req.body.rankingString,
            numberOfReviews: req.body.numberOfReviews,
            venue: {
                address: venue.address,
                city: venue.city,
                country: venue.country,
                coordinates: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }
            },
            photos: req.body.photos, // Assuming photos field is also present
            timing: {
                opening_time: timing.opening_time,
                closing_time: timing.closing_time
            },
            dummyPrice: req.body.dummyPrice
        });

        await newPlace.save();
        res.status(201).json({ message: 'Place added successfully', place: newPlace });
    } catch (error) {
        res.status(500).json({ message: 'Error adding place', error });
    }
};



const SearchPlaces = async (req, res) => {
    let placeType = req.query.type;
    console.log("Place Type:", placeType);

    try {
        let query = {};

        if (placeType && placeType.trim().toLowerCase() !== 'all') {
            placeType = placeType.trim().toLowerCase(); // Convert to lowercase
            query = { type: { $in: [placeType] } };
            console.log("Filtered by type:", query);
        }
        const places = await Place.find(query);
        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ message: 'Error fetching places', error });
    }
};


const DeleteAllPlace = async (req, res) => {
    try {
        await Place.deleteMany({});
        res.status(200).json({ message: 'All places removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing all places', error });
    }
};


module.exports = { SearchPlaces, CreatePlace, DeleteAllPlace };
