const Places = require('../models/Places');
const YourPlace = require('../models/YourPlace');


//Travel Mitra suggestion of place under user budget
const TravelMitraPlanning = async (req, res) => {
    try {
        const { budget } = req.body;
        const userBudget = parseFloat(budget); // Ensure budget is a number
        console.log("User budget:", userBudget);

        // Fetch all places from the database
        const allPlaces = await Places.find();

        // Filter places within budget
        const selectedPlaces = allPlaces.filter(place => {
            // Remove 'Rs' and any commas or spaces, then parse as a number
            const priceString = place.dummyPrice.replace(/[^\d.-]/g, '').trim();
            const price = parseFloat(priceString); // Parse price as a number

            // Log each place’s price to check parsing
            console.log(`Place: ${place.name}, Dummy Price: ${place.dummyPrice}, Parsed Price: ${price}`);

            // Return only places that are within the user’s budget
            return price <= userBudget;
        });

        // Check if any places are within budget
        if (selectedPlaces.length === 0) {
            return res.status(400).json({ message: 'No places available within your budget.' });
        }

       

        // Respond with selected places
        res.status(200).json({ places: selectedPlaces });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Error in fetching the places', error });
    }
};

// user selected places budget calculation
const YourPlaces = async (req, res) => {
    try {
        const { budget } = req.body;
        console.log("Received Budget:", budget);

        if (!budget) {
            return res.status(400).json({ message: 'Budget is required' });
        }

        // Fetch all places from the database
        const allPlaces = await YourPlace.find({});
        console.log(allPlaces);
        let totalCost = 0;
        for (const place of allPlaces) {
            const price = parseFloat(place.dummyPrice.replace(' Rs', '').trim());

            // Ensure the budget constraint
            if (totalCost + price <= budget) {
                totalCost += price;
            }
        }
        // After selecting minimum, fill remaining places with random selections within budget
        const remainingBudget = budget - totalCost;
        // Check if the total cost exceeds the budget
        if (totalCost > budget) {
            const savings = totalCost - budget;
            return res.status(400).json({
                message: `Your plan exceeds your budget by Rs ${savings.toFixed(2)}. You could save Rs ${savings.toFixed(2)} if you adjust your selection.`
            });
        }
        // Respond with the selected places and the total cost
        res.status(200).json({totalPrice: totalCost,saving: remainingBudget });
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching the places', error });
    }
};



// check places type 


const checkPlaceTypes = async (req, res) => {
    try {
        // Define the expected place types
        const expectedTypes = ['historical', 'religious', 'nature', 'shopping', 'food', 'hotels', 'entertainment'];
        console.log("hi");
        // Fetch all places from the database
        const allPlaces = await YourPlace.find({});

        // Extract unique types from the database places
        const existingTypes = [...new Set(allPlaces.map(place => place.type))];

        // Find missing types
        const missingTypes = expectedTypes.filter(type => !existingTypes.includes(type));

        // Respond with the missing types if any are not present
        if (missingTypes.length > 0) {
            res.status(200).json({
                message: 'Some types are missing in your database.',
                missingTypes: missingTypes,
                suggestion: 'You can consider adding places from these types to enrich your data.'
            });
        } else {
            res.status(200).json({
                message: 'All required types are present in the database.'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in checking place types', error });
    }
};



module.exports = { TravelMitraPlanning, YourPlaces, checkPlaceTypes };



