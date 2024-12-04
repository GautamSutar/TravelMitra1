import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Festival = () => {
    const [festData, setFestData] = useState([]);

    // Fetch data for festivals
    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/fest/getFestival`);
            console.log("Fetched Data:", response.data);

            if (Array.isArray(response.data)) {
                setFestData(response.data);
            } else if (Array.isArray(response.data.festivals)) {
                setFestData(response.data.festivals);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-gray-100 p-10">
            <h2 className="text-5xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Festivals
            </h2>
            <h2 className="text-2xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                Festivals are the vibrant threads that weave joy, tradition, and togetherness into the fabric of our lives, illuminating our hearts with the warmth of shared celebrations. 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {festData.map((fest, index) => (
                    <div
                        key={index}
                        className="relative bg-white border rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src={fest.image}
                            alt={fest.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                                {fest.title}
                            </h3>
                            <p className="text-sm text-gray-600 text-justify">
                                {fest.description.length > 150
                                    ? `${fest.description.substring(0, 150)}...`
                                    : fest.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Festival;
