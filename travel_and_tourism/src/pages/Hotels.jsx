import React, { useEffect, useState } from "react";
import HotelCard from "../component/HotelCard";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
axios.defaults.withCredentials = true;
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // For triggering animation

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Retrieve the token from sessionStorage, since that's where you said you store it
        const token = sessionStorage.getItem('token'); // Get the token from the session storage
        console.log("🟢 Token Retrieved from Session Storage:", token); // Debugging log
        // Proper string interpolation for Authorization header

        if (!token) {
          console.error("🔴 No Token Found in Session Storage");
          return;
        }
        
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/hotel/getHotel`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Correct syntax
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true, // Ensure this matches the backend setting
          }
        );
        
        console.log("Hotels Data Fetched Successfully:", response.data);
        setHotels(response.data);
        setFilteredHotels(response.data);
        triggerAnimation(); // Trigger animation on initial load
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // Trigger animation by changing the animationKey
  const triggerAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Handle Sorting
  const handleSort = (type) => {
    let sortedHotels = [...filteredHotels];
    if (type === "priceLowToHigh") {
      sortedHotels.sort((a, b) => a.priceLevel - b.priceLevel);
    } else if (type === "priceHighToLow") {
      sortedHotels.sort((a, b) => b.priceLevel - a.priceLevel);
    } else if (type === "ratingLowToHigh") {
      sortedHotels.sort((a, b) => a.rating - b.rating);
    } else if (type === "ratingHighToLow") {
      sortedHotels.sort((a, b) => b.rating - a.rating);
    } else if (type === "noFilter") {
      sortedHotels = hotels; // Reset to original data
      setSearchQuery(""); // Clear search input
    }
    setSortType(type);
    setFilteredHotels(sortedHotels);
    setShowFilterOptions(false); // Auto-close dropdown
    triggerAnimation(); // Trigger animation on filter
  };

  // Handle Search
  const handleSearch = (query) => { 
    setSearchQuery(query);

    const searchResults = hotels.filter((hotel) => {
      const searchText = query.toLowerCase();
      return (
        hotel.name.toLowerCase().includes(searchText) ||
        hotel.address.toLowerCase().includes(searchText)
      );
    });

    setFilteredHotels(searchResults);
    triggerAnimation(); // Trigger animation on search
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 p-8">
      {/* Title */}
      <h1 className="text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 mb-10 font-serif transform transition-transform duration-500 hover:scale-110 hover:text-shadow-lg">
        Find Your Comfort!
      </h1>
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 h-1 w-32 mx-auto mb-10 rounded-full animate-pulse"></div>

      {/* Search Bar and Filter Button */}
      <div className="flex justify-center items-center space-x-8 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or address"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-3/4 max-w-3xl px-6 py-4 rounded-full border-2 border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:ring-blue-400 transition shadow-xl transform hover:scale-105"
        />

        {/* Filter Button */}
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          {showFilterOptions && (
            <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 w-56">
              <ul className="text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSort("priceLowToHigh")}
                >
                  Price: Low to High
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSort("priceHighToLow")}
                >
                  Price: High to Low
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSort("ratingLowToHigh")}
                >
                  Rating: Low to High
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSort("ratingHighToLow")}
                >
                  Rating: High to Low
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"
                  onClick={() => handleSort("noFilter")}
                >
                  No Filter
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredHotels.map((hotel, index) => (
          <div
            key={hotel._id}
            style={{
              animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s both`,
            }}
          >
            <HotelCard
              hotel={{
                ...hotel,
                nameGradient: "from-green-400 via-teal-500 to-blue-600",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
