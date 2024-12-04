const IconicPerson = require('../models/IconicPerson'); // Assuming you have an Personality model

const IconicPersons = async (req, res) => {
    try {
        // Provide a default value if address is missing or empty
        const newPersonality = new IconicPerson({
            name: req.body.name,
            image_url: req.body.image_url,
            description: req.body.description
        });

        await newPersonality.save();
        res.status(201).json({ message: 'Personality added successfully', Personality: newPersonality });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Personality', error });
    }
};


const AllPersonality = async (req, res) => {
    try {
        const person = await IconicPerson.find();
        res.status(200).json({ message: 'All Personality Are Following', person });
    } catch (error) {
        console.log("Hi :",error);
        res.status(500).json({ message: 'Error in getting person', error: error.message });
    }
}


const DeleteIconic = async (req, res) => {
    try {
        await IconicPerson.deleteMany({});
        res.status(200).json({ message: 'All Iconinc Personality Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error in removing iconic personality', error });
    }
};

module.exports = { IconicPersons, AllPersonality, DeleteIconic };

