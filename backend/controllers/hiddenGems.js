const HiddenGems = require('../models/HiddenGems'); // Assuming you have an Event model

const CreateHiddenGems = async (req, res) => {
    try {
        // Create a new HiddenGems document
        const newHiddenGems = new HiddenGems({
            name: req.body.name,
            images: req.body.images, // Expecting an array of image URLs
            fullDescription: req.body.fullDescription,
            description: req.body.description,
            registration_link: req.body.registration_link, // Optional field
            mapLink: req.body.mapLink,
        });

        // Save the document to the database
        await newHiddenGems.save();

        // Send success response
        res.status(201).json({
            message: 'Hidden Gem added successfully',
            event: newHiddenGems,
        });
    } catch (error) {
        console.error("Error creating Hidden Gem:", error);
        res.status(500).json({
            message: 'Error adding Hidden Gem',
            error: error.message,
        });
    }
};


//********* All Hidden Gems *************** */

const AllHidden = async (req, res) => {
    try {
        const hidden = await HiddenGems.find();
        res.status(200).json({ message: 'All Hidden Gems', hidden });
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Hidden Gems', error: error.message });
    }
}


const DeleteHiddenGems = async (req, res) => {
    try {
        await HiddenGems.deleteMany({});
        res.status(200).json({ message: 'All Hidden Gems Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error in removing Hidden Gems', error });
    }
};

const Detail = async (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).send({ error: "No ID provided." });
    }

    try {
        // Fetch the place from the database using the provided ID
        const place = await HiddenGems.findById(id);

        if (!place) {
            return res.status(404).send({ error: "Place not found." });
        }

        console.log(`Place found for ID ${id}:`, place);

        // Respond with the place details
        return res.status(200).send({ place });
    } catch (error) {
        console.error("Error fetching place from database:", error);
        return res.status(500).send({ error: "Internal Server Error." });
    }
};


module.exports = { CreateHiddenGems, AllHidden, DeleteHiddenGems, Detail };
