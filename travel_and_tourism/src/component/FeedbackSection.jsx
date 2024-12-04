import React from 'react';

const FeedbackSection = () => {
    const testimonials = [
        { text: "Travel Mitra made my trip seamless and unforgettable. Highly recommended!", name: "Gautam Sutar" },
        { text: "The attention to detail was amazing! Every part of our journey was planned perfectly.", name: "Gouransh Pathak" },
        { text: "Exceptional service! They went above and beyond to accommodate all my requests.", name: "Garveet Jain" },
        { text: "Thanks to Travel Mitra, our family vacation was stress-free and full of wonderful memories.", name: "Hemant Rajput" },
        { text: "Best travel partner! I'll definitely book my future trips with them.", name: "Dipika Patel" },
        { text: "The expertise and support provided made our adventure flawless. Can't thank them enough!", name: "Anamika Nagar" },

    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-8">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-white hover:bg-orange-400 transform transition-transform duration-300 hover:scale-105  hover:text-slate-50 rounded-lg shadow-md text-center">
                    <p className="text-gray-700  font-semibold">"{testimonial.text}"</p>
                    <p className="text-gray-500 mt-2">- {testimonial.name}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedbackSection;
