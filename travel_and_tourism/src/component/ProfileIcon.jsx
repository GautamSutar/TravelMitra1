import React, { useState } from 'react';

function ProfileIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <div
                onClick={toggleDropdown}
                className="profile-icon bg-slate-400 h-8 w-8 rounded-full overflow-hidden mr-5 cursor-pointer hover:border-2 hover:border-orange-400"
            >
                <img src="./public/images/profile.jpg" alt="profile icon" />
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Change Password</a>
                    <a href="#" className="block px-4 py-2 text-red-500 hover:bg-gray-100">Logout</a>

                </div>
            )}
        </div>
    );
}

export default ProfileIcon;