import React from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const FetchBookingDetails = ({ userId }) => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT token
        setUser({ id: decoded.id, name: decoded.name, email: decoded.email }); // Set user details
      } catch (error) {
        console.log(
          "fileFrontend (fetchBookingDetails.jsx) Error in decoding the jwtToken: ",
          error
        );
        console.error("fileFrontend (Booking.jsx) = Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchingDetails(user.id);
    }
  }, [user.id]);

  const fetchingDetails = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/hotel-details/booking/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true, // Ensure this matches the backend setting
        }
      );

      setBookingDetails(response.data.bookings); //correct way to handle the exios data
      console.log("(FetchBookingDetails:) User Id are: ", user.id);
      console.log(
        "(FetchBookingDetails:) The booking details are: ",
        response.data
      );
    } catch (error) {
      console.error(
        "file Frontend (fetchBookingDetails.jsx) Error fetching booking details: ",
        error
      );
      setError("Error fetching booking details");
    }
  };

  return (
    <>
      <div className="flex justify-center p-9 bg-gray-100">
        <div className="w-full bg-white max-w-4xl shadow-lg rounded-lg p-6">
          <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
            Booking Details
          </h2>
          {bookingDetails.length > 0 ? (
            bookingDetails.map((booking) => (
              <div
                key={booking._id}
                className="border p-4 rounded-lg mb-6 bg-gray-100"
              >
                {/* Hotel Image */}
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="w-full h-56 object-cover rounded-md mb-4"
                />

                {/* Hotel Name */}
                <h3 className="text-xl font-bold text-gray-700">
                  {booking.hotelName}
                </h3>

                {/* User Info */}
                <p className="text-gray-600">
                  <strong>Booked by:</strong> {booking.userName} (
                  {booking.userEmail})
                </p>

                {/* Booking Dates */}
                <p className="text-gray-600">
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()} |{" "}
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>

                {/* Pricing & Rating */}
                <p className="text-gray-600">
                  <strong>Price:</strong> ₹{booking.price} |{" "}
                  <strong>Rating:</strong> ⭐{booking.rating}
                </p>

                {/* Room Details */}
                <div className="mt-3">
                  <p className="text-gray-600">
                    <strong>Rooms:</strong>
                  </p>
                  <ul className="list-disc ml-5 text-gray-700">
                    <li>Standard: {booking.rooms.standard}</li>
                    <li>Deluxe: {booking.rooms.deluxe}</li>
                    <li>Suite: {booking.rooms.suite}</li>
                  </ul>
                </div>

                {/* Guests Information */}
                <div className="mt-3">
                  <p className="text-gray-600">
                    <strong>Guests:</strong>
                  </p>
                  <ul className="list-disc ml-5 text-gray-700">
                    <li>Adults: {booking.numberOfAdults}</li>
                    <li>Children: {booking.numberOfChildren}</li>
                    <li>Pets: {booking.numberOfPets}</li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FetchBookingDetails;
