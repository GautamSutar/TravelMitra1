import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HiddenGems = () => {
    const [places, setPlaces] = useState([]); // State to store the list of places
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/hidden/getHiddenGems`);
            console.log("Fetched Data:", response.data); // Check the structure of the response

            if (response.data.hidden && Array.isArray(response.data.hidden)) {
                setPlaces(response.data.hidden);
            } else {
                console.error("Error: Expected an array but received:", response.data.hidden);
                setPlaces([]); // Fallback to an empty array if the data is not valid
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleMoreClick = async (placeId) => {
        try {
            console.log('placeId:', placeId);
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/hidden/detail`, { id: placeId });
            console.log("POST Response:", response.data);
            navigate(`/details`, { state: { placeId } });
        } catch (error) {
            console.error("Error posting place ID:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-gray-100 p-10">
            <h2 className="text-10xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                Hidden Gems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {places.map((place, index) => (
                    <div
                        key={index}
                        className="group relative bg-white border rounded-lg shadow-lg flex flex-col transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                        {place.images && Array.isArray(place.images) && place.images[0] ? (
                            <div className="relative">
                                <img
                                    src={place.images[0]}
                                    alt={place.name || "Hidden Gem"}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-white text-lg font-semibold">
                                        {place.name || "Unnamed Location"}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-48 flex items-center justify-center bg-gray-300">
                                <span>No Image Available</span>
                            </div>
                        )}
                        <div className="flex flex-col flex-grow p-4">
                            <h3 className="text-center text-xl font-semibold text-gray-800 mb-4">
                                {place.name || "Unnamed Location"}
                            </h3>
                            <p className="text-gray-600 flex-grow">
                                {place.description && place.description.length > 120
                                    ? `${place.description.substring(0, 120)}...`
                                    : place.description || "No description available."}
                            </p>
                            <div className="mt-4">
                                <button
                                    onClick={() => handleMoreClick(place._id)}
                                    className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HiddenGems;
