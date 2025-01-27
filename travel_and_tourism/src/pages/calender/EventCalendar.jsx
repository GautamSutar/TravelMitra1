import React, { useEffect, useState } from 'react';
import CalenderView from './CalendarView';

import axios from "axios";

const EventCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/event/getEvent`);
                console.log("Data For Calender is here", response);
                const events = response.data.events;
                console.log('hi i am data : ',events)
                const formattedEvents = events.map((event) => ({
                    id: event._id,
                    title: event.name,
                    start: new Date(Date.parse(event.date)),
                    end: new Date(Date.parse(event.endDate)),
                    isFeatured: event.isFeatured,
                }));
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