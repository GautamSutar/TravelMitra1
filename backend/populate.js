const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');
const hotels = require('./data/hotels.json');

dotenv.config();

const populateDatabase = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    await Hotel.deleteMany();
    await Hotel.insertMany(hotels);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data', error);
    process.exit(1);
  }
};

populateDatabase();