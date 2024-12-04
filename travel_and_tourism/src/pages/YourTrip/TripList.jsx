// src/YourPlannedTrip/TripList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import TripItem from './TripItem';

const TripList = ({ tripData, loading, onRemove }) => (
    <div className=" market-list w-full max-w-4xl">
        {loading ? (
            <p className="text-center">Loading...</p>
        ) : tripData.length > 0 ? (
            tripData.map((market) => (
                <TripItem key={market._id} market={market} onRemove={onRemove} />
            ))
        ) : (
            <p className="text-center">No places planned for your trip.</p>
        )}
    </div>
);

TripList.propTypes = {
    tripData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default TripList;
