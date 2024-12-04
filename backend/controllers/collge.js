const express = require('express');
const Colleges = require('../models/Colleges');


// **************** adding collesges

const CreateCollege = async (req, res) => {
    try {
        const newCollege = new Colleges({
            image_url: req.body.image_url,            // Adjusted field name for image
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating,
            phone_number: req.body.phone_number,   // Adjusted field name for phone number
            type: req.body.type,                  // Array of types
            web_url: req.body.web_url,             // Adjusted field name for website URL
            email: req.body.email                 // Added new field for email
        });

        await newCollege.save();
        res.status(201).json({ message: 'College added successfully', college: newCollege });
    } catch (error) {
        res.status(500).json({ message: 'Error in adding College', error });
    }
};


// ********************** fetching by query

const SearchCollege = async (req, res) => {
    let collegeType = req.query.type;
    console.log("Place Type:", collegeType);

    try {
        let query = {};

        if (collegeType && collegeType.trim().toLowerCase() !== 'all') {
            collegeType = collegeType.trim().toLowerCase(); // Convert to lowercase
            query = { type: { $in: [collegeType] } };
            console.log("Filtered by type:", query);
        }
        const places = await Colleges.find(query);

        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ message: 'Error fetching places', error });
    }
};

module.exports = {
    CreateCollege, SearchCollege
}