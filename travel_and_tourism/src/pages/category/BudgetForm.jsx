// src/YourPlannedTrip/BudgetForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BudgetForm = ({ onSubmit, error }) => {
    const [budget, setBudget] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(budget);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="px-4 w-full py-2 border rounded mb-4"
                placeholder="Enter budget amount"
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Plan by Travel Mitra
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
    );
};

BudgetForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default BudgetForm;
