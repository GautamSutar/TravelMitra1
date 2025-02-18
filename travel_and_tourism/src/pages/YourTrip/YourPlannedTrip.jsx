import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import BudgetForm from '../category/BudgetForm';
import TripSummary from './TripSummary';
import TripList from './TripList';
axios.defaults.withCredentials = true;
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
            const response = await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/budget/yourPlace`,
              { budget: Number(budgetAmount) },
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
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
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-4 sm:p-6"
        >
            {/* Budget Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <BudgetForm onSubmit={handleBudgetSubmit} error={error} />
            </motion.div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <TripSummary budget={budget} totalPrice={totalPrice} saving={saving} error={error} />
            </motion.div>

            {/* Trip List */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            staggerChildren: 0.15,
                        },
                    },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
            >
                {tripData.map((trip, index) => (
                    <motion.div
                        key={trip.id}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, x: (index % 2 === 0) ? -20 : 20 },
                            visible: { opacity: 1, scale: 1, x: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <TripList tripData={[trip]} loading={loading} onRemove={handleRemove} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default YourPlannedTrip;
