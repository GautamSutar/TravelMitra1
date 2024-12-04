// src/components/BudgetModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    const handlePlanByTravelMitra = () => {
        navigate('/travel-mitra-trips');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-semibold mb-4 text-center">Plan Your Trip</h2>
                <button
                    onClick={handlePlanByTravelMitra}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2"
                >
                    Plan by Travel Mitra
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                >
                    Plan Trip Manually
                </button>
            </div>
        </div>
    );
};

export default BudgetModal;
