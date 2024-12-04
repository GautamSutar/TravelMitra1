// src/YourPlannedTrip/YourPlannedTrip.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetForm from '../category/BudgetForm';
import TripSummary from './TripSummary';
import TripList from './TripList';

const YourPlannedTrip = () => {
    const [tripData, setTripData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(null);
    const [saving, setSaving] = useState(null);
    const [error, setError] = useState('');
    const [budget, setBudget] = useState('');

    const fetchTripData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/trip/allPlannedTrip`);
            setTripData(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data.message || 'Error fetching trip data');
        } finally {
            setLoading(false);
        }
    };

    const handleBudgetSubmit = async (budgetAmount) => {
        setBudget(budgetAmount);
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/budget/yourPlace`, { budget: Number(budgetAmount) });
            setTotalPrice(response.data.totalPrice);
            setSaving(response.data.saving);
            setError('');
        } catch (err) {
            setError(err.response?.data.message || 'An error occurred, please try again');
        }
    };

    const handleRemove = async (marketId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/trip/deletingTrip/${marketId}`);
            fetchTripData();
        } catch (err) {
            setError('Error removing place from trip');
        }
    };

    useEffect(() => {
        fetchTripData();
    }, []);

    return (
        <div className="p-4 sm:p-6">
            <BudgetForm onSubmit={handleBudgetSubmit} error={error} />
            <TripSummary budget={budget} totalPrice={totalPrice} saving={saving} error={error} />
            <TripList tripData={tripData} loading={loading} onRemove={handleRemove} />
        </div>
    );
};

export default YourPlannedTrip;
