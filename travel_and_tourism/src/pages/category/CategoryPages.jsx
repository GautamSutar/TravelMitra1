import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategorySelection from './CategorySelection';
import MarketList from './MarketList';
import BudgetModal from '../../component/BudgetModal';
axios.defaults.withCredentials = true;
const CategoryPage = () => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addedTrips, setAddedTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open initially
    const navigate = useNavigate();

    const categories = [
        { name: 'Historical', imageUrl: 'https://www.easemytrip.com/travel/img/gwalior-fort.jpg' },
        { name: 'Religious', imageUrl: 'https://cdn.prod.website-files.com/64b0face30b4c55a16a289be/64de43ba2b83bf4758797a71_iStock-1450238249.jpg' },
        { name: 'Shopping', imageUrl: 'https://5.imimg.com/data5/LR/YA/MY-4958034/online-shopping-system.jpg' },
        { name: 'Nature', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzMfaaYcdgs_okhsVhcC4M3e2e_ZUrwdaQrA&s' },
        { name: 'Food', imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/96bc0685998497.60e2a9400cb03.jpg' },
        { name: 'Hotel', imageUrl: 'https://www.kayak.co.in/news/wp-content/uploads/sites/76/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg' },
        { name: 'Entertainment', imageUrl: 'https://akamaividz2.zee5.com/image/upload/platform/LiveTv/Entertainment-genre.jpg' }
    ];

    // Fetch data for a specific type or all places
    const fetchData = async (type) => {
        try {
            setLoading(true);
            const response = await axios.get(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/place/searchplace?type=${type}`,
              {
                withCredentials: true, // Ensure this matches the backend setting
              }
            );
            setMarketData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // Fetch all places on page load
    useEffect(() => {
        fetchData('all'); // Fetch all places by default
    }, []);

    const handleAdd = async (market) => {
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/trip/addingTrip`, market);
            setAddedTrips([...addedTrips, market._id]);
        } catch (error) {
            console.error('Error adding to trip:', error);
        }
    };

    const handleRemove = async (market) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/trip/deletingTrip/${market._id}`);
            setAddedTrips(addedTrips.filter(id => id !== market._id));
        } catch (error) {
            console.error('Error removing from trip:', error);
        }
    };

    const handleModalSubmit = async (budget) => {
        try {
            // Post budget to the backend
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/trip/planTripByBudget`, { budget });
            // Redirect to Travel Mitra Best Trips page
            navigate('/travelMitraBestTrips');
        } catch (error) {
            console.error('Error planning trip by budget:', error);
        }
    };

    return (
        <>
            {/* Budget Modal */}
            <BudgetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />

            {/* Category Selection and Market List */}
            <div className="chooseCategory mt-10">
                <h1 className="text-4xl font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent mb-8 text-center">Choose a Category</h1>
            </div>
            <div className="chooseCategory mt-10">
                <h1 className="text-2xl font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent mb-8 text-center">Choose a place according to the following categories: historical, religious, shopping, nature, food, hotels, and entertainment.</h1>
            </div>
            <div className="mt-5 bg-white flex flex-col items-center justify-center">
                <CategorySelection categories={categories} fetchData={fetchData} />
                <div>
                    <MarketList
                        marketData={marketData}
                        loading={loading}
                        addedTrips={addedTrips}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                    />
                </div>
            </div>
        </>
    );
};
export default CategoryPage;
