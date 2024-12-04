const Events = require('../models/Events'); // Assuming you have an Event model

const CreateEvent = async (req, res) => {
    try {
        // Provide a default value if address is missing or empty
        const address = req.body.address || "Address not provided";

        const newEvent = new Events({
            name: req.body.name,
            type: req.body.type,
            time: req.body.time,
            date: req.body.date,
            ticket_price: req.body.ticket_price,
            registration_link: req.body.registration_link,
            image_url: req.body.image_url,
            address: address
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding event', error });
    }
};


const AllEvent = async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json({ message: 'All Events Are Following',events });
    } catch (error) {
        res.status(500).json({ message: 'Error adding event', error: error.message });
    }
}


module.exports = { CreateEvent, AllEvent };
