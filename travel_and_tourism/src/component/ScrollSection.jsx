import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScrollSection = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.parallax-item');
            const scrollPosition = window.scrollY;

            elements.forEach((el, index) => {
                const elementTop = el.getBoundingClientRect().top + window.scrollY;
                const speed = parseFloat(el.dataset.speed || 1);

                // Adjust element movement based on scroll position and speed
                const movement = (scrollPosition - elementTop) * speed;

                if (scrollPosition + window.innerHeight > elementTop) {
                    el.style.transform = `translateY(${movement}px) scale(1.1)`;
                    el.style.opacity = '1';
                } else {
                    el.style.transform = 'translateY(50px) scale(1)';
                    el.style.opacity = '0';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const personalities = [
        {
            name: 'Lata Mangeshkar',
            img: '/assets/images/lata.jpg',
            description:
                'Lata Mangeshkar was an iconic Indian playback singer, renowned for her melodious voice.',
        },
        {
            name: 'Kishore Kumar',
            img: '/assets/images/kishore.jpg',
            description: 'Kishore Kumar Was a Student of Christian College Indore',
        },
        {
            name: 'Rahul Dravid',
            img: '/assets/images/dravid.jpg',
            description:
                'Rahul Dravid, born in Indore, is a legendary Indian cricketer known for his solid technique.',
        }
    ];

    return (
        <section className="relative bg-gray-100 p-10">
            <h2 className="text-4xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">
                Iconic Personalities
            </h2>

            <Link to="/iconic">
                <div className="grid grid-cols-1 mt-48 md:grid-cols-3 gap-8">
                    {personalities.map((person, index) => (
                        <div
                            key={index}
                            className="parallax-item relative p-4 opacity-0 transition-all duration-700 ease-out bg-transparent border rounded-lg shadow-2xl mb-8"
                            data-speed={0.1 + index * 0.1} // Individual speed for each element
                        >
                            <img
                                src={person.img}
                                alt={person.name}
                                className="w-full h-64 object-cover cursor-pointer rounded-md"
                            />
                            <div className="mt-4 text-white px-4 py-2 bg-gray-900 bg-opacity-50 rounded-md">
                                <p>{person.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Link>
        </section>
    );
};

export default ScrollSection;
