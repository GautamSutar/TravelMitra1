// src/components/CompanyStats.js
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
const IndoreStats = () => {
    const navigate = useNavigate();
    const { ref: statsRef, inView: statsInView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const stats = [
        { label: 'Indore bags the cleanest city award for the seventh year in a row', count: 7, icon: '🧹' },
        { label: 'Declared as one of the Top 20 Cities for ease of living in india by the Ministry of Housing and Urban Affairs ', count: 20, icon: '✅' },
        { label: 'Indore has been selected as one of the 100 Indian cities to be developed as a smart city under the Smart Cities Mission', count: 100, icon: '🌇' },
        { label: 'Facts', count: 15, icon: '➡️' },
    ];

    const handleCategoryClick = (label) => {
        if (label === 'Facts') {
            navigate('/fact');
        } 
    };


    return (
        <div className="py-10 bg-transparent  text-white">
            <h2 className="text-center font-bold  text-4xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent
             mb-8">Indore's Achievements and Awards</h2>
            <h2 className="text-center font-lora text-2xl bg-gradient-to-r from-green-500 to-teal-400 font-bold bg-clip-text 
             text-transparent mb-8">ndore's achievements and awards shine brightly, reflecting its relentless
                pursuit of excellence and its vibrant spirit of innovation and progress. 🌟</h2>
            <div
                ref={statsRef}
                className="container cursor-pointer  bg-transparent mx-auto flex flex-wrap justify-center gap-8 px-4"
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        onClick={() => handleCategoryClick(stat.label)}
                        className={`w-72 p-6 bg-white rounded-lg bg-transparent shadow-lg text-center transition-transform duration-700
                             hover:scale-110 ${statsInView ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
                            }`}
                    >
                        <div className="bg-transparent text-8xl mb-4">{stat.icon}</div>
                        <h3 className="bg-transparent text-2xl font-semibold text-green-800">
                            <CountUp
                                start={0}
                                end={statsInView ? stat.count : 0}
                                duration={2.5}
                                delay={0.5}
                            />
                        </h3>
                        <p className=" text-gray-700 mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndoreStats;
