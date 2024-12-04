import React, { useEffect, useState, useRef } from "react";

function TopDestinations() {
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.indexOf(entry.target);
                        if (!visibleItems.includes(index)) {
                            setVisibleItems((prev) => [...prev, index]);
                        }
                    }
                });
            },
            { threshold: 0.9 }
        );

        itemRefs.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            itemRefs.current.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, [visibleItems]);

    return (
        <section
            id="destinations"
            className="p-5 sm:p-8 md:p-10 text-center mt-5 bg-slate-100"
        >
            <h2 className="text-2xl sm:text-3xl font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent font-bold font-serif text-navy-dark mb-6 transition duration-300 ease-in-out transform hover:scale-105 hover:text-navy-light">
                Top Destinations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Rajwada",
                        img: "./assets/images/rajwada.jpg",
                    },
                    {
                        title: "Sarafa Bazar",
                        img: "./assets/images/sarafa.jpeg",
                    },
                    {
                        title: "Pitra Parvat",
                        img: "https://thumbs.dreamstime.com/b/huge-idol-lord bg-transparent-hanuman-pitr-parwat-indore-very-big-large-statue-hindu-god-hill-near-205757680.jpg",
                    },
                    {
                        title: "Lal Bagh Palace",
                        img: "https://th.bing.com/th/id/OIP.dHGetgW4tvDyECd76zv-ZwHaFj?rs=1&pid=ImgDetMain",
                    },
                ].map((destination, index) => (
                    <div
                        key={index}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`p-4 bg-white border border-rose-300 rounded-lg shadow-lg transform transition-all duration-300 cursor-pointer 
                        ${visibleItems.includes(index)
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                            }`}
                        style={{ transitionDelay: `${index * 300}ms` }}
                    >
                        <img
                            src={destination.img}
                            alt={destination.title}
                            className="w-full h-40 sm:h-48 md:h-56 lg:h-60 object-cover rounded-t-lg"
                        />
                        <div className="text-center mt-2 font-lora font-semibold text-sm sm:text-base md:text-lg">
                            {destination.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TopDestinations;
