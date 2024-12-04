import React from 'react'
import FeedbackSection from './FeedbackSection';


function Testimonials() {
    return (
        <section className="p-10 text-center bg-slate-100">

            <h2 className="text-4xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent font-bold text-navy-dark mb-6 transition duration-300 ease-in-out transform hover:scale-105 hover:text-navy-light font-serif">Customer Testimonials</h2>
            <FeedbackSection />
        </section>
    );
}

export default Testimonials