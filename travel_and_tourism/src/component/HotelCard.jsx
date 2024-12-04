import React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${hotel._id}`);
  };

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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
          <h2 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
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
          onClick={handleBooking}
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-500 w-full transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
