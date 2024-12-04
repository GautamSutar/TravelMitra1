// src/components/CompanyStats.js
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Fact = () => {
    const { ref: statsRef, inView: statsInView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const titles = [
        "Awarded as the Best Smart City under the Smart Cities Mission by the Government of India in 2022.",
        "Named as the Cleanest City in Madhya Pradesh every year since 2016.",
        "Won the Garbage-Free City (7-star rating) certification in 2023.",
        "Recognized for its innovative waste management practices, including segregation and recycling.",
        "Indore Airport (Devi Ahilya Bai Holkar Airport) received accolades for being the Best Regional Airport in Central India.",
        "Declared as one of the Top 20 Cities for Ease of Living in India by the Ministry of Housing and Urban Affairs.",
        "Praised for its Smart Parking Systems and urban infrastructure developments.",
        "Multiple awards for public transport systems, including the IBUS rapid transit system.",
        "Ranked Cleanest City in India for 7 consecutive years (2017-2023) in the Swachh Survekshan awards.",
        "Recognized as the first 'Water Plus' city in India under the Swachh Bharat Mission in 2021.",
    ];

    const stats = titles.map((title, i) => ({
        title,
        count: i + 1,
    }));

    return (
        <div className="py-10 bg-transparent text-white">
            <h2 className="text-center text-4xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent font-bold mb-8">
                Indore's Achievements and Awards
            </h2>
            <h2 className="text-center text-2xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent font-bold  mb-8">
                Indore's achievements and awards are a testament to its dynamic growth and unwavering commitment to excellence.
                From being recognized as the cleanest city in India to its thriving educational and industrial sectors,
                Indore continues to shine brightly on the national and international stage. 🌟
            </h2>
            <div
                ref={statsRef}
                className="container cursor-pointer bg-transparent mx-auto flex flex-wrap justify-center gap-8 px-4"
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`stat-card w-72 p-6 rounded-lg shadow-lg text-center transition-all duration-700 hover:scale-110 ${statsInView
                                ? 'animate-bounce-slow transform translate-y-0 opacity-100'
                                : 'transform translate-y-10 opacity-0'
                            }`}
                    >
                        <h3 className="text-2xl font-semibold text-green-800">
                            <CountUp
                                start={0}
                                end={statsInView ? stat.count : 0}
                                duration={2.5}
                                delay={0.5}
                            />
                        </h3>
                        <p className="text-gray-700 mt-2">
                            {stat.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fact;
