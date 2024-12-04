import React from 'react';
import { Link } from 'react-router-dom';

const MarketList = ({ marketData, loading, addedTrips, handleAdd, handleRemove }) => {
    const defaultImageUrl = 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

    return (
        <>
            <div className="w-full bg-slate-100 market-list">
                {loading ? (
                    <p>Loading...</p>
                ) : marketData.length > 0 ? (
                    <div className="grid grid-cols-1 bg-slate-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {marketData.map((market, index) => (
                            <div
                                key={index}
                                className={`shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-200 flex flex-col items-center relative 
                                    ${addedTrips.includes(market._id) ? 'bg-gray-300 text-white' : 'bg-white'}`}
                            >
                                <div className="w-full h-48">
                                    <img
                                        src={market.image ? market.image : defaultImageUrl}
                                        alt={market.name ? market.name : 'Image Coming Soon'}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="text-black w-full mt-4">
                                    <div className="container mx-auto p-4 h-64 overflow-auto rounded-lg">
                                        <h2 className="text-xl font-semibold text-center">{market.name}</h2>
                                        <p><strong>Category:</strong> {market.category || 'N/A'}</p>
                                        <p><strong>Address:</strong> {market.address}</p>

                                        <p>
                                            <strong>Rating:</strong>
                                            {[...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <i
                                                        key={index}
                                                        className={
                                                            market.rating >= ratingValue
                                                                ? 'ri-star-fill text-yellow-500'
                                                                : market.rating >= ratingValue - 0.5
                                                                    ? 'ri-star-half-line text-yellow-500'
                                                                    : 'ri-star-line text-gray-300'
                                                        }
                                                    ></i>
                                                );
                                            })}
                                        </p>
                                        {market.type === 'hotel' && market.webUrl && (
                                            <p>
                                                <strong>Website: </strong>
                                                <Link
                                                    to={market.webUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    {market.webUrl.length > 20 ? `${market.webUrl.slice(0, 20)}...` : market.webUrl}
                                                </Link>
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex space-x-24 mt-0 justify-center">
                                        {!addedTrips.includes(market._id) ? (
                                            <button
                                                onClick={() => handleAdd(market)}
                                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 rounded-lg"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRemove(market)}
                                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-4 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No places found for the selected category.</p>
                )}
            </div>
        </>
    );
};

export default MarketList;
