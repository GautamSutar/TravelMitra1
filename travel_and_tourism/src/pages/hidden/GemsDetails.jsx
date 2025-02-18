import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const GemsDetails = () => {
    const location = useLocation();
    const [placeDetails, setPlaceDetails] = useState(null);
    const { placeId } = location.state || {}; // Get placeId from location state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchPlaceDetails = async () => {
        try {
            const response = await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/hidden/detail`,
              { id: placeId },
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            console.log("Place Details:", response.data);
            setPlaceDetails(response.data.place); // Assuming the response has a "place" field with details
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % placeDetails.images.length);
    };

    useEffect(() => {
        if (placeDetails && placeDetails.images) {
            const interval = setInterval(nextImage, 2000); // Change image every 3 seconds
            return () => clearInterval(interval); // Cleanup on component unmount
        }
    }, [placeDetails]);

    useEffect(() => {
        if (placeId) {
            fetchPlaceDetails(); // Fetch details when the component mounts
        }
    }, [placeId]);

    if (!placeId) {
        return <div>No place selected. Please go back and select a place.</div>;
    }

    return (
        <section className="min-h-screen bg-slate-100 p-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                More Information
            </h2>

            {placeDetails ? (
                <div className="max-w-4xl mx-auto bg-slate-100 rounded-lg p-8">
                    {/* Automatic Image Slider */}
                    <div className="relative">
                        {placeDetails.images && placeDetails.images.length > 0 && (
                            <img
                                src={placeDetails.images[currentImageIndex]}
                                alt="Place"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white text-lg font-semibold font-lora">Place Images</span>
                        </div>
                    </div>

                    {/* Place Details */}
                    <h2 className="text-3xl font-bold mb-6 text-center font-lora">{placeDetails.name}</h2>
                    <p className="mt-4 text-gray-700 font-lora">{placeDetails.description}</p>
                    <div className="mt-4 text-gray-600 font-lora">{placeDetails.fullDescription}</div>
                    {placeDetails.mapLink && (
                        <div className="mt-6">
                            <a
                                href={placeDetails.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline font-lora"
                            >
                                View on Map
                            </a>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {/* Images (below the main image slider) */}
                        {placeDetails.images.map((image, index) => (
                            <img key={index} src={image} alt="Place" className="w-full h-48 object-cover rounded-lg" />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600 font-lora">Loading details...</div>
            )}
        </section>
    );
};

export default GemsDetails;
