import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TripItem = ({ market, onRemove }) => (
    <div className="flex flex-col sm:flex-row p-4 border rounded-lg shadow-xl market-item w-full bg-white mb-4 hover:shadow-xl transition-shadow duration-200 flex-wrap md:flex-nowrap items-start md:items-center justify-start relative">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 mb-4 md:mb-0">
            <img
                src={market.image || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg'}
                alt={market.name || 'Image Coming Soon'}
                className="w-full h-48 object-cover rounded-lg" // Fixed image height and responsive width
            />
        </div>

        {/* Text Content Section */}
        <div className="text-black w-full sm:w-2/3 pl-0 sm:pl-4">
            <h2 className="text-xl font-semibold">{market.name}</h2>
            <p><strong>Category:</strong> {market.category || 'N/A'}</p>
            <p>{market.description || 'No description available'}</p>
            <p><strong>Address:</strong> {market.address}</p>
            <p><strong>Phone:</strong> {market.phone || 'N/A'}</p>
            <p><strong>Ranking Position:</strong> {market.rankingPosition}</p>

            {/* Rating */}
            <p><strong>Rating:</strong>
                {[...Array(5)].map((_, index) => (
                    <i key={index} className={market.rating >= index + 1 ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-300'}></i>
                ))}
            </p>

            {/* Conditionally render WebUrl for Hotel category */}
            {market.category === 'Hotel' && market.webUrl && (
                <p className="mt-2">
                    <strong>WebUrl:</strong>
                    <Link to="#" onClick={() => window.open(market.webUrl, '_blank')} className="text-blue-500 hover:underline">
                        {market.webUrl.length > 10 ? `${market.webUrl.slice(0, 10)}...${market.webUrl.slice(-13)}` : market.webUrl}
                    </Link>
                </p>
            )}

            {/* Remove Button */}
            <button onClick={() => onRemove(market._id)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-4 rounded-lg absolute bottom-4 right-4">
                Remove
            </button>
        </div>
    </div>
);

TripItem.propTypes = {
    market: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default TripItem;
