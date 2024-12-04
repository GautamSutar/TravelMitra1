const fetival = require('../models/Festival'); // Import the Mongoose model

// Function to handle saving a new festival
const createFestival = async (req, res) => {
    try {
        // Provide a default value if address is missing or empty
        const { image, title, description, link } = req.body;

        // Check if any required fields are missing
        if (!image || !title || !description || !link) {
            return res.status(400).json({ message: 'All fields (image, title, description, and link) are required' });
        }

        // Create a new festival document
        const newFestival = new fetival({
            image,
            title,
            description,
            link
        });

        // Save the new festival document to the database
        await newFestival.save();

        // Respond with the newly created festival
        res.status(201).json({ message: 'Festival added successfully', festival: newFestival });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Festival', error });
    }
};

// Function to get all festivals
const getFestivals = async (req, res) => {
    try {
        // Fetch all festivals from the database
        const festivals = await fetival.find();

        // Return the festivals
        return res.status(200).json({ message: 'All festivals', festivals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createFestival, getFestivals };
