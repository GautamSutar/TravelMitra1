// src/YourPlannedTrip/TripSummary.jsx

import React from 'react';
import PropTypes from 'prop-types';

const TripSummary = ({ budget, totalPrice, saving, error }) => (
    <div className="text-center bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-center font-bold text-xl mb-4">Trip Budget Summary</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p><strong>Total Budget:</strong> {budget} Rs</p>
        <p><strong>Expenses For This Place:</strong> {totalPrice} Rs</p>
        <p><strong>You Have Saved:</strong> {saving} Rs</p>
    </div>
);

TripSummary.propTypes = {
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    saving: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
};

export default TripSummary;
