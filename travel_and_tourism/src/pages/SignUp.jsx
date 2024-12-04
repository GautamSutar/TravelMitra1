import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpSectionVisible, setOtpSectionVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchMessage("Passwords do not match!");
      return;
    }

    setPasswordMatchMessage('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordMatchMessage(
        "Password must be at least 9 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    setPasswordMatchMessage('');

    if (email) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL }/api/auth/register`, {
          name,
          email,
          password,
        });

        Swal.fire({
          icon: "success",
          title: "Registration Successfully",
          text: "Otp Sent To Your Email.",
          confirmButtonText: "Okay",
          confirmButtonColor: '#27ED64',
        });

        setOtpSectionVisible(true);
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.error.includes("OTP")) {
            setOtpErrorMessage("Error sending OTP: " + error.response.data.error);
          } else if (error.response.data.error.includes("Password")) {
            setPasswordMatchMessage(error.response.data.error);
          } else {
            Swal.fire({
              icon: "error",
              title: "Registration Failure",
              text: `${error.response.data.error}, Please try again`,
              confirmButtonText: "Retry",
              confirmButtonColor: '#FF5733',
            });
          }
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    } else {
      setPasswordMatchMessage("Please enter a valid email.");
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value.length === 1 && index < 5) {
      document.getElementById(`otp-${index + 2}`).focus();
    }

    setOtp(newOtp);
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/verify-otp`, {
        email,
        otp: otpValue,
      });
      setSuccessMessage(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Otp Verified Successfully",
        text: "Now You Can Login.",
        confirmButtonText: "Okay",
        confirmButtonColor: '#27ED64',
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.response.data.error}`,
        text: 'Error Verifying OTP Please try again',
        confirmButtonText: "Retry",
        confirmButtonColor: '#FF5733',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <img
            src="/assets/images/travelmitra1.png"
            alt="Indore Travel"
            className="w-3/4 sm:w-2/3 lg:w-full h-auto object-contain rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 lg:p-10 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">TravelMitra Indore</h2>
          <h3 className="text-lg font-medium mb-6">Create Your Account</h3>
          <form onSubmit={otpSectionVisible ? handleSubmitOtp : handleSendOtp}>
            {!otpSectionVisible && (
              <>
                <div className="mb-4">
                  <label className="block text-left font-medium mb-1" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left font-medium mb-1" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left font-medium mb-1" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {passwordMatchMessage && <p className="text-red-500 text-sm mb-4">{passwordMatchMessage}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white p-3 rounded-lg transition hover:bg-blue-800"
                >
                  Send OTP
                </button>
              </>
            )}
            {otpSectionVisible && (
              <>
                <h4 className="text-lg font-medium mb-6">Enter OTP</h4>
                <div className="flex justify-center mb-6 space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`otp-${index + 1}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg transition hover:bg-blue-700"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>
          {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
