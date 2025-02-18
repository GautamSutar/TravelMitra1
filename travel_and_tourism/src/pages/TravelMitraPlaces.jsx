import React, { useState } from 'react';
import axios from 'axios';


const TravelMitraPlaces = () => {
    const [budget, setBudget] = useState('');
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [toltalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [addedTrips, setAddedTrips] = useState([]);

    const handleBudgetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/budget/travelMitra`,
              {
                budget,
              },
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            setSelectedPlaces(response.data.places);
            setTotalPrice(response.data.totalPrice);
            setError('');
        } catch (err) {
            setError(err.response?.data.message || 'An error occurred, please try again');
            setSelectedPlaces([]);
            setTotalPrice(0);
        }
    };

    const handleAdd = async (place) => {
        try {
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/trip/addingTrip`,
              place,
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            setAddedTrips([...addedTrips, place._id]);
        } catch (error) {
            console.error('Error adding to trip:', error);
        }
    };

    const handleRemove = async (place) => {
        try {
            await axios.delete(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/trip/deletingTrip/${place._id}`,
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            setAddedTrips(addedTrips.filter(id => id !== place._id));
        } catch (error) {
            console.error('Error removing from trip:', error);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <form onSubmit={handleBudgetSubmit} className="mb-6">
                <h3 className="text-green-500 text-center font-bold text-xl mb-2 ">Travel Mitra Best Suggested Places </h3>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="px-4 w-full py-2 border rounded mb-4"
                    placeholder="Enter budget amount"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Plan by Travel Mitra
                </button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {selectedPlaces.length > 0 && (
                <div>
                    <h3 className="text-center font-bold text-lg mb-2">These are the places within your budget</h3>
                    <p className="text-center text-red-900 mb-4">Your Budget: {budget} Rs</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {selectedPlaces.map((place, index) => {
                            // Check if the place is in the addedTrips array
                            const isAdded = addedTrips.includes(place._id);

                            return (
                                <div
                                    key={index}
                                    className={`w-full shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col items-center relative ${isAdded ? 'bg-gray-200' : 'bg-white'}`}
                                >
                                    <div className="w-full h-48">
                                        <img
                                            src={place.image || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='}
                                            alt={place.name || 'Image Coming Soon'}
                                            className="w-full h-full object-cover rounded-t-lg" // Makes all images consistent in size
                                        />
                                    </div>

                                    <div className="flex-grow text-black w-full p-4">
                                        <h4 className="text-xl font-semibold mb-2 text-center">{place.name}</h4>
                                        <p className="mb-1"><strong>Category:</strong> {place.category}</p>
                                        <p className="mb-1"><strong>Address:</strong> {place.address}</p>
                                        <p className="mb-1"><strong>Ranking Position:</strong> {place.rankingPosition}</p>
                                        <p className="flex items-center mb-1">
                                            <strong>Rating:</strong>
                                            {[...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <i
                                                        key={index}
                                                        className={
                                                            place.rating >= ratingValue
                                                                ? 'ri-star-fill text-yellow-500'
                                                                : place.rating >= ratingValue - 0.5
                                                                    ? 'ri-star-half-line text-yellow-500'
                                                                    : 'ri-star-line text-gray-300'
                                                        }
                                                    ></i>
                                                );
                                            })}
                                        </p>
                                        <p className="mb-4"><strong>Price:</strong> {place.dummyPrice}</p>
                                    </div>

                                    <div className="flex gap-2 justify-center pb-4">
                                        <button
                                            onClick={() => handleAdd(place)}
                                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 rounded-lg"
                                            disabled={isAdded} // Disable add button if already added
                                        >
                                            {isAdded ? 'Added' : 'Add'}
                                        </button>
                                        <button
                                            onClick={() => handleRemove(place)}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-4 rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
     
        </div>
    );
};

export default TravelMitraPlaces;
