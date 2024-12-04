import React from 'react';

const CategorySelection = ({ categories, fetchData }) => {
    const defaultImageUrl = 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 bg-slate-100">
            {categories.map((category) => (
                <div
                    key={category.name}
                    className="category-card p-2 shadow-lg rounded-lg cursor-pointer transform transition-transform duration-300 group hover:scale-105 relative group overflow-hidden flex flex-col items-center"
                    onClick={() => fetchData(category.name)}
                >
                    <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56">
                        <img
                            src={category.imageUrl || defaultImageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-50 rounded-lg"></div>
                    </div>
                    <h2 className="text-sm sm:text-md md:text-lg font-semibold text-center mt-4 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default CategorySelection;
