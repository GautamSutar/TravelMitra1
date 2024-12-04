import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function PlanTrip() {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState([]);
    const [showTransportButtons, setShowTransportButtons] = useState(false); // State to toggle transportation buttons
    const [activeCardIndex, setActiveCardIndex] = useState(null); // Track the active card

    const categories = [
        { title: 'Plan Trip', img: 'https://hotelwoodlandnainital.com/wp-content/uploads/2024/09/Plan-Your-Trip.png' },
        { title: 'Events', img: 'https://delhipedia.com/wp-content/uploads/2021/03/vaccine_delhi_sat_660_170121092818.jpg' },
        { title: 'Festival', img: 'https://im.hunt.in/cg/indore/City-Guide/bloglarge-1315003306.jpg' },
        { title: 'Hidden Gems', img: '/assets/images/hiddenGems.jpg' },
        { title: 'Transportation', img: 'https://philburn.com/wp-content/uploads/2017/03/Philburn_16.jpg' }
    ];

    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target);
                        if (!visibleCards.includes(index)) {
                            setVisibleCards((prev) => [...prev, index]);
                        }
                    }
                });
            },
            { threshold: 0.9 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [visibleCards]);

    const handleCategoryClick = (title, index) => {
        if (title === 'Plan Trip') {
            navigate('/category');
        } else if (title === 'Events') {
            navigate('/events');
        } else if (title === 'Festival') {
            navigate('/fest');
        } else if (title === 'Hidden Gems') {
            navigate('/hidden');
        } else if (title === 'Transportation') {
            setActiveCardIndex(index); // Set active card to toggle buttons
            setShowTransportButtons(!showTransportButtons); // Toggle transportation options
        }
    };

    return (
        <section id="Planning" className="p-10 text-center bg-slate-100">
            <h2 className="text-3xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent font-bold font-serif mb-6 transition duration-300 ease-in-out transform hover:scale-105 text-navy-dark hover:text-navy-light">
                Start Planning Trip Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-transparent gap-6 relative">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardRefs.current[index] = el)}
                        onClick={() => handleCategoryClick(cat.title, index)}
                        className={`relative p-4 bg-transparent border border-rose-300 rounded-lg shadow-2xl transform transition hover:scale-110 ease-in-out cursor-pointer duration-300
                ${visibleCards.includes(index) ? 'translate-y-9 opacity-100' : 'translate-x-100 opacity-0'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <img
                            src={cat.img}
                            alt={cat.title}
                            className="w-full bg-transparent h-32 object-cover rounded-t-lg"
                        />
                        <div className="text-center mt-2 font-lora font-semibold bg-transparent text-lg">
                            {cat.title}
                        </div>

                        {/* Transportation Options (buttons) */}
                        {activeCardIndex === index && showTransportButtons && (
                            <div className="absolute inset-0 flex justify-center items-center z-10">
                                {/* Adjusted positions for proper spacing */}
                                <button
                                    onClick={() => window.open('https://www.olacabs.com/', '_blank')}
                                    className="absolute w-16 h-16 font-bold bg-orange-500 text-black rounded-full shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform"
                                    style={{
                                        top: '20%',
                                        left: '25%',
                                        animation: 'moveButton 1s ease-out 0.5s forwards',
                                    }}
                                >
                                    Ola
                                </button>
                                <button
                                    onClick={() => window.open('https://www.uber.com/in/en/', '_blank')}
                                    className="absolute w-16 h-16 font-bold bg-orange-500 text-black rounded-full shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform"
                                    style={{
                                        top: '20%',
                                        right: '25%',
                                        animation: 'moveButton 1s ease-out 0.6s forwards',
                                    }}
                                >
                                    Uber
                                </button>
                                <button
                                    onClick={() => window.open('http://www.citybusindore.com/', '_blank')}
                                    className="absolute w-16 h-16 font-bold bg-orange-500 text-black rounded-full shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform"
                                    style={{
                                        bottom: '20%',
                                        left: '25%',
                                        animation: 'moveButton 1s ease-out 0.7s forwards',
                                    }}
                                >
                                    AiCTSL
                                </button>
                                <button
                                    onClick={() => window.open('https://www.rapido.bike/', '_blank')}
                                    className="absolute w-16 h-16 font-bold bg-orange-500 text-black rounded-full shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform"
                                    style={{
                                        bottom: '20%',
                                        right: '25%',
                                        animation: 'moveButton 1s ease-out 0.8s forwards',
                                    }}
                                >
                                    Rapido
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CSS to animate button movement */}
            <style>{`
        @keyframes moveButton {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `}</style>
        </section>

    );
}

export default PlanTrip;
