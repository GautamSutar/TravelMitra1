import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <section className="  bg-slate-100   min-h-screen p-10">
            {/* About Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                    About Our Website
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                    Your ultimate guide to exploring Indore – from famous landmarks to hidden gems, plan your perfect trip here!
                </p>
            </div>

            {/* Website Purpose Section */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">Our Purpose</h3>
                <p className="text-lg text-gray-700">
                    We aim to provide an all-encompassing platform that highlights the beauty and culture of Indore. Whether you’re a
                    first-time visitor or a local looking to explore more, our website serves as your personal guide to Indore.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Famous Places & Hidden Gems</h4>
                    <p className="text-gray-700 mb-4">
                        Discover the iconic landmarks of Indore, along with some hidden gems that are less known but just as beautiful.
                    </p>
                    <Link to="/famous-places" className="text-blue-600 hover:text-blue-800 transition">Explore Famous Places</Link>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Plan Your Trip</h4>
                    <p className="text-gray-700 mb-4">
                        Planning your trip is easy with our detailed guides on the best time to visit, itineraries, and more.
                    </p>
                    <Link to="/plan-trip" className="text-blue-600 hover:text-blue-800 transition">Plan Your Trip</Link>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Hotel Booking</h4>
                    <p className="text-gray-700 mb-4">
                        Book hotels effortlessly through our platform, with a variety of options suited to your budget and preferences.
                    </p>
                    <Link to="/hotels" className="text-blue-600 hover:text-blue-800 transition">Book Hotels</Link>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Transportation Links</h4>
                    <p className="text-gray-700 mb-4">
                        We provide direct links to transportation services for a seamless travel experience, including flights and local transit.
                    </p>
                    <Link to="/transportation" className="text-blue-600 hover:text-blue-800 transition">Get Transportation Info</Link>
                </div>

                {/* Feature 5 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Indore's Iconic Personalities</h4>
                    <p className="text-gray-700 mb-4">
                        Learn about the famous figures who have shaped the culture, politics, and development of Indore.
                    </p>
                    <Link to="/iconic-personalities" className="text-blue-600 hover:text-blue-800 transition">Explore Personalities</Link>
                </div>

                {/* Feature 6 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Achievements & Awards</h4>
                    <p className="text-gray-700 mb-4">
                        Discover the remarkable achievements and awards that Indore has earned for its cleanliness, smart city initiatives, and more.
                    </p>
                    <Link to="/achievements" className="text-blue-600 hover:text-blue-800 transition">See Achievements</Link>
                </div>

                {/* Feature 7 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h4 className="text-2xl font-semibold text-green-600 mb-4">Festivals & Events</h4>
                    <p className="text-gray-700 mb-4">
                        Stay updated with the latest festivals and events happening in Indore, a city full of culture and traditions.
                    </p>
                    <Link to="/events" className="text-blue-600 hover:text-blue-800 transition">Check Events</Link>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Join Us in Exploring Indore</h3>
                <p className="text-lg text-gray-600 mb-6">
                    Whether you're planning a trip or just learning about Indore, we’re here to help you make the most of your experience.
                </p>
                <Link
                    to="/category"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Explore Indore Now
                </Link>
            </div>
        </section>
    );
};

export default AboutPage;
