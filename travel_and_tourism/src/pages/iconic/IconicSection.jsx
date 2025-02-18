import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const IconicSection = () => {
    const [personData, setPersonData] = useState([]);

    // Fetch data for a specific type or all places
    const fetchData = async () => {
        try {
            const response = await axios.get(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/iconic/getPerson`,
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            console.log("Fetched Data:", response.data);
            if (Array.isArray(response.data)) {
                setPersonData(response.data); // Set directly if it's an array
            } else if (Array.isArray(response.data.person)) {
                setPersonData(response.data.person); // Access nested array
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (

      
            
            
        <section className="relative min-h-screen overflow-hidden bg-gray-100 p-10">
            <h2 className="text-4xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                Iconic Personalities
            </h2>
            <h2 className="text-2xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                Indore has been home to many iconic personalities who have left an indelible mark on
                various fields.From the legendary playback singer Lata Mangeshkar, whose melodious voice
                has enchanted generations, to the visionary industrialist Jamnalal Bajaj, whose contributions
                to Indian industry are unparalleled, Indore's luminaries continue to inspire and shape the future. 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {personData.map((person, index) => (
                    <div
                        key={index}
                        className="group relative bg-transparent border rounded-lg shadow-2xl mb-8 transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={person.image_url}
                            alt={person.name}
                            className="w-full h-64 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute text-xs w-full  bottom-36  left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-75 text-white px-4 py-2 rounded-md font-semibold text-center">
                            {person.name}   
                        </div>
                        <div className="mt-20 text-gray-800 px-4 py-2 bg-gray-100 rounded-md">
                            <p>
                                {person.description.length > 100
                                    ? `${person.description.substring(0, 100)}...`
                                    : person.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default IconicSection;
