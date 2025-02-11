import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import axios from "axios";
import Swal from 'sweetalert2';
import "./Booking.css"; // Make sure you have this CSS file for additional styling
import FetchBookingDetails from "./FetchBookingDetails";

const Booking = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel; // ✅ Get hotel data from state
 
  console.log("Hotel Data:", hotel);

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfPets: 0,
    rooms: {
      standard: 0,
      deluxe: 0,
      suite: 0,
    },
  });

  const [user, setUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT token
        setUser({ id: decoded.id, name: decoded.name, email: decoded.email }); // Set user details
      } catch (error) {
        console.log("fileFrontend (Booking.jsx): ", error);
        console.error("fileFrontend (Booking.jsx) = Invalid token:", error);
      }
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name.startsWith("rooms.")) {
  //     const roomType = name.split(".")[1];
  //     setFormData((prev) => ({
  //       ...prev,
  //       rooms: { ...prev.rooms, [roomType]: Number(value) },
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("rooms.")) {
      const roomType = name.split(".")[1]; // Extract room type (e.g., standard, deluxe)
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: Number(value), // Convert to number
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Increment/Decrement Room Count
  const adjustRoomCount = (roomType, increment) => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: Math.max(0, prev.rooms[roomType] + increment), // Prevent negative values
      },
    }));
  };

  const handleSubmit = async (e) => {           //Handle Submit 
    e.preventDefault();
    setBookingConfirmed(true); // Trigger the confirmation popup
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log("🔴 Error: Token not found");
    return;
  }

  

  const bookingData = {
    hotelId,  
    hotelName: hotel?.name,
    price: hotel?.priceLevel,
    rating: hotel?.rating,
    image: hotel?.image,
    checkInDate: formData.checkInDate,
    checkOutDate: formData.checkOutDate,
    numberOfAdults: formData.numberOfAdults,
    numberOfChildren: formData.numberOfChildren,
    numberOfPets: formData.numberOfPets,
    rooms: formData.rooms,
    userId: user.id, // Include user ID
    userName: user.name,
    userEmail: user.email,
  };
  console.log("Alldetails: ", hotelId, hotel.name, hotel.priceLevel, hotel.rating, hotel.image, user.id, user.name, user.email, 
  formData.numberOfAdults, formData.numberOfChildren, formData.numberOfPets, formData.checkInDate, formData.checkOutDate, formData.rooms);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/hotel-book/create`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  Swal.fire({
        icon: 'success',
        title: 'Hotel Details',
        text: 'Thank You Sir To Select Our Hotel',
        confirmButtonText: 'Next',
        confirmButtonColor: '#27ED64',
      });
    console.log("✅ Booking successful:", response.data);
    navigate('/fetchBookingDetails' );
  } catch (error) {
    Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: `${error.response?.data?.message || 'Server error'}, Please try again`,
            confirmButtonText: 'Retry',
            confirmButtonColor: '#FF5733',
          });
    console.error("❌ Booking failed:", error.response?.data || error.message);
  }

};



const [bookingConfirmed, setBookingConfirmed] = useState(false);


// Handle form submission
// const handleSubmit = (e) => {
//   e.preventDefault();
//   setBookingConfirmed(true); // Trigger the confirmation popup
// };

// // Increment/Decrement Room Count
// const adjustRoomCount = (roomType, increment) => {
//   setFormData((prev) => ({
//     ...prev,
//     rooms: {
//       ...prev.rooms,
//       [roomType]: Math.max(0, prev.rooms[roomType] + increment), // Prevent negative values
//     },
//   }));
// };

// Navigate to booking details
// const handleNext = () => {
//   navigate(`/your-hotel-book-details?hotelId=${hotelId}`);
// };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 p-8">
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
      <h2 className="text-4xl font-bold text-center mb-6 text-white hover:animate-glow">
        Enter Your Booking Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Check-In Date */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-800">Check-In Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 bg-indigo-50 shadow-md"
          />
        </div>

        {/* Check-Out Date */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-800">Check-Out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 bg-indigo-50 shadow-md"
          />
        </div>

        {/* Number of Guests */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-800">Adults</label>
            <input
              type="number"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 bg-indigo-50 shadow-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800">Children</label>
            <input
              type="number"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 bg-indigo-50 shadow-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800">Pets</label>
            <input
              type="number"
              name="numberOfPets"
              value={formData.numberOfPets}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border-2 border-indigo-500 rounded-xl focus:ring-2 bg-indigo-50 shadow-md"
            />
          </div>
        </div>

        {/* Room Selection */}
        <div className="space-y-4">
          {["standard", "deluxe", "suite"].map((roomType) => (
            <div key={roomType} className="flex items-center justify-between">
              <label className="text-lg font-medium text-white capitalize">{roomType} Room</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => adjustRoomCount(roomType, -1)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full text-lg"
                >
                  -
                </button>
                <span className="px-4 text-xl text-white">{formData.rooms[roomType]}</span>
                <button
                  type="button"
                  onClick={() => adjustRoomCount(roomType, 1)}
                  className="px-3 py-1 bg-green-500 text-white rounded-full text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Buttons */}
        <div className="items-center flex justify-center">
         
          <button
            type="submit"
            // onClick={handleNext}
            className="px-6 py-3 bg-blue-600  text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
          >
            See Your Hotel Details
          </button>
          {/* <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
            >
              Next
            </button> */}
        </div>
      </form>
    </div>

    {/* Confirmation Popup */}
    {bookingConfirmed && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Booking Confirmed!</h3>
          <p>Your booking has been successfully recorded.</p>
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => setBookingConfirmed(false)}
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
