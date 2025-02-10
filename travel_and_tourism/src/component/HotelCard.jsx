import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBooking = async (hotel) => {
    
    if (!hotel) {
      console.error("❌ Hotel data is undefined!");
      return;
    }
    
    navigate(`/booking/${hotel._id}`, { state: { hotel } }); // ✅ Pass hotel data using state
    
    // try {
    //   console.log("Hotel Details:", hotel); // Debugging

    //   if (!hotel) {
    //     console.error("❌ Hotel data is undefined!");
    //     return;
    //   }

    //   const token = sessionStorage.getItem('token'); // Get the token 
    //   if (!token) {
    //     console.log("🔴 Error: Token not found");
    //     return;
    //   }

    //   console.log("Details: ", hotel._id, hotel.name, hotel.image, hotel.price, hotel.rating);

    //   const response = await axios.post(
    //     `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/hotel-book/create`,
    //     {
    //       hotelId: hotel._id,
    //       hotelName: hotel.name,
    //       price: hotel.priceLevel,
    //       rating: hotel.rating,
    //       image: hotel.image
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       }
    //     }
    //   );

    //   console.log("✅ Booking successful:", response.data);
    //   sessionStorage.setItem('bookingDetails', JSON.stringify(response.data));
    //   navigate(`/booking/${hotel._id}`);
    // } catch (error) {
    //   console.error("❌ Booking failed:", error.response?.data || error.message);
    // }
  }

  return (
    <div
      className="relative bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-[0px_10px_30px_-10px_rgba(59,130,246,0.6)] hover:border-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
      style={{ perspective: "1000px" }} // Enables 3D effect
    >
      <div
        className="relative overflow-hidden transform hover:rotate-1 hover:translate-y-[-5px] transition duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-80 object-cover transform transition duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0  p-4 bg-black/50 text-white px-4 py-2 rounded-md backdrop-blur-md">
          <h2 className="text-lg font-extrabold bg-clip-text ">
            {hotel.name}
          </h2>
          <p className="text-sm">{hotel.address}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">Rating : {hotel.rating}⭐</p>
        <p className="text-gray-600">Number of Reviews : {hotel.numberOfReviews}</p>
        <p className="text-blue-500 font-semibold mb-4">
          ₹{hotel.priceLevel} per night
        </p>
        <button
          onClick={() => handleBooking(hotel)} // ✅ Only sends the clicked hotel's details
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-500 w-full transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
