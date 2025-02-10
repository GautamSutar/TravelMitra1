import React, { useEffect, useState } from "react";
import CalendarView from "./CalendarView";
import axios from "axios";

const EventCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/event/getEvent`);
                console.log("Response from backend:", response.data);
                const events = response.data.events;

                // Convert date strings to valid JavaScript Date objects
                const formattedEvents = events.map((event) => ({
                    id: event._id,
                    title: event.name,
                    start: new Date(event.date), // Parse event.date into a Date object
                    end: new Date(event.endDate), // Parse event.endDate into a Date object
                    isFeatured: event.isFeatured,
                }));

                console.log("Formatted Events:", formattedEvents);
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching events", error);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = (event) => {
        alert(`Event: ${event.title}\nDetails: ${event.description}`);
    };

    return <CalendarView events={events} onEventClick={handleEventClick} />;
};

export default EventCalendar;
