const express = require('express');
const TripPlan = require('../models/YourPlace');


const addTripPlan = async (req, res) => {
    try {
        const newTrip = new TripPlan(req.body);
        await newTrip.save();
        console.log("trip added succefully ")
        res.status(201).json({ message: 'trip added succefully', newTrip });

    } catch (error) {
        res.status(500).json({ message: 'Error adding trip', error });
        console.log(error);
    }
};


const removeTripPlan = async (req, res) => {
    try {
        const { id } = req.params;
        await TripPlan.findByIdAndDelete(id);
        res.status(200).json({ message: 'Trip removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing trip', error });
    }
};


const DeleteAllTrip = async (req, res) => {
    try {
        await TripPlan.deleteMany({});
        res.status(200).json({ message: 'All places removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing all places', error });
    }
};


const getTripPlans = async (req, res) => {
    try {
        console.log("Fetching all planned trips...");
        const trips = await TripPlan.find();
        console.log("Trips fetched successfully:", trips);  // Check if trips data is logged
        res.status(200).json(trips);
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({ message: 'Error fetching trips', error });
    }
};


module.exports = {
    addTripPlan,
    removeTripPlan,
    getTripPlans,
    DeleteAllTrip
};
