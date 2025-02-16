import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Navbar() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');
    const [openModal, setOpenModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleScrollToFooter = () => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
            footerElement.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
            setOpenModal(true);
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/pic/upload-profile-pic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpenModal(false);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    const handleDone = () => {
        if (selectedFile) {
            handleFileUpload(selectedFile);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/pic/displayprofile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data && response.data.profilePicture) {
                setProfilePictureUrl(response.data.profilePicture);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleCancel = () => {
        setOpenModal(false);
        setImagePreviewUrl('');
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            sessionStorage.removeItem('token');
            // alert('Logged out successfully.');
            Swal.fire({
                icon: "success",
                title: "Logout Successfully",
                text: "Login Again.",
                confirmButtonText: "Okay",
                confirmButtonColor: '#27ED64',
            });
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="shadow-md p-4 bg-gradient-to-r from-green-100 to-teal-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img
                        src="/assets/images/travelmitra1.png"
                        className="h-16 w-16 rounded-full object-cover cursor-pointer"
                    />
                    <Link to="/" className="ml-2">
                        <img className="w-full h-20 object-cover mix-blend-multiply bg-blend-multiply" src="/assets/images/TT.png" alt="" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4">
                    <Link
                        to="/home"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-blue-800"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-red-800"
                    >
                        About
                    </Link>
                    <Link
                        to="/events"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-blue-800"
                    >
                        Event
                    </Link>
                    <Link
                        to="/hotel"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-red-800"
                    >
                    Book Your Hotel
                    </Link>
                    <Link
                        to="#"
                        onClick={handleScrollToFooter}
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-blue-800"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/category"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-red-800"
                    >
                        Category
                    </Link>
                    <Link
                        to="/planedtrip"
                        className="font-bold text-lg md:text-xl hover:scale-110 transition transform duration-300 text-blue-800"
                    >
                        Your Trips
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="hidden md:flex items-center space-x-4 md:space-x-9">
                    <img
                        src={profilePictureUrl}
                        className="h-10 w-10 hover:scale-110 transition transform duration-300 rounded-full object-cover cursor-pointer"
                        onClick={() => document.getElementById('profilePictureInput').click()}
                    />
                    <button
                        onClick={handleLogout}
                        className="text-lg md:text-xl font-bold text-gray-800 hover:scale-110 transition transform duration-300"
                    >
                        Logout
                    </button>
                    <button className="flex items-center justify-center  text-white w-32 h-15 rounded-full bg-red-800 hover:scale-110 transition transform duration-300 focus:outline-none">
                        <Link to="/" className='text-xl flex items-center gap-3 '>
                            <i className="ri-user-line text-xl"></i>
                            <h1>Login</h1>  
                        </Link>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block md:hidden text-gray-800 hover:text-pink-500 focus:outline-none"
                >
                    <i className="ri-menu-line text-2xl"></i>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 bg-white shadow-md rounded-lg">
                    <Link
                        to="/"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                    >
                        About
                    </Link>
                    <Link
                        to="#"
                        onClick={handleScrollToFooter}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/category"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                    >
                        Category
                    </Link>
                    <Link
                        to="/planedtrip"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                    >
                        Your Trips
                    </Link>
                </div>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-lg font-bold">Preview Your Image</h2>
                        {imagePreviewUrl && (
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded-full mx-auto"
                            />
                        )}
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={handleDone}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Done
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>


    );
}

export default Navbar;
