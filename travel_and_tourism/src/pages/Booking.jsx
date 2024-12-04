import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './Booking.css';  // For additional custom styles

const Booking = () => {
  const { hotelId } = useParams();
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 0,
    numberOfChildren: 0,
    numberOfPets: 0,
    rooms: {
      standard: 0,
      deluxe: 0,
      suite: 0,
    },
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("rooms")) {
      const roomType = name.split("-")[1];
      setFormData({
        ...formData,
        rooms: {
          ...formData.rooms,
          [roomType]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true); // Trigger the confirmation popup
  };

  const handleRoomIncrement = (roomType) => {
    setFormData({
      ...formData,
      rooms: {
        ...formData.rooms,
        [roomType]: formData.rooms[roomType] + 1,
      },
    });
  };

  const handleRoomDecrement = (roomType) => {
    if (formData.rooms[roomType] > 0) {
      setFormData({
        ...formData,
        rooms: {
          ...formData.rooms,
          [roomType]: formData.rooms[roomType] - 1,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 p-8">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-xl shadow-2xl w-full max-w-4xl h-full">
        <h2 className="text-4xl font-bold text-center mb-6 text-white hover:animate-glow">
          Enter Your Booking Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Check-In Date */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800 "><p className="font-extrabold hover:animate-glow">Check-In Date</p></label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 bg-indigo-50 shadow-md"
            />
          </div>

          {/* Check-Out Date */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800"><p className="font-extrabold hover:animate-glow">Check-Out Date</p></label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 bg-indigo-50 shadow-md"
            />
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800"><p className="font-extrabold ">Adults</p></label>
            <input
              type="number"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 bg-indigo-50 shadow-md"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium  text-gray-800"><p className="font-extrabold">Children</p></label>
            <input
              type="number"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 bg-indigo-50 shadow-md"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800"><p className="font-extrabold">Pets</p></label>
            <input
              type="number"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 bg-indigo-50 shadow-md"
            />
          </div>

          {/* Room Types Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-gray-800">Select Rooms</h3>
            {["standard", "deluxe", "suite"].map((room) => (
              <div key={room} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-lg transition-all hover:bg-indigo-50 hover:shadow-2xl">
                <label className="text-gray-800 capitalize text-lg">{room} Room</label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleRoomDecrement(room)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full transition-all duration-200 hover:bg-red-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name={`rooms-${room}`}
                    value={formData.rooms[room]}
                    onChange={handleChange}
                    className="w-16 text-center border-2 border-indigo-500 rounded-xl"
                    min="0"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => handleRoomIncrement(room)}
                    className="px-4 py-2 bg-green-500 text-white rounded-full transition-all duration-200 hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Booking Confirmation Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold text-green-600">Booking Confirmed!</h3>
            <p className="mt-2">Hotel ID: {hotelId}</p>
            <p>Check-In: {formData.checkInDate}</p>
            <p>Check-Out: {formData.checkOutDate}</p>
            <p>Adults: {formData.numberOfAdults}</p>
            <p>Children: {formData.numberOfChildren}</p>
            <p>Pets: {formData.numberOfPets}</p>
            <p>Standard Rooms: {formData.rooms.standard}</p>
            <p>Deluxe Rooms: {formData.rooms.deluxe}</p>
            <p>Suites: {formData.rooms.suite}</p>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
