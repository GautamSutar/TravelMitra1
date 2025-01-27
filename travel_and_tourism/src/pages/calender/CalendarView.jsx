import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Define colors for categories
const categoryColors = {
    Cultural: "#FF7F50", // Coral
    Adventure: "#8A2BE2", // Blue Violet
    "Food & Drink": "#FFD700", // Gold
    Workshops: "#20B2AA", // Light Sea Green
    Default: "#007BFF", // Blue for events with no category
};

const CalendarView = ({ events, onEventClick }) => {
    // Customize event styles based on category
    const eventStyleGetter = (event) => {
        const backgroundColor = categoryColors[event.category] || categoryColors.Default;
        return {
            style: {
                backgroundColor,
                color: "white",
                borderRadius: "8px",
                padding: "8px",
                border: "1px solid #ddd",
            },
        };
    };

    return (
        <div style={{ height: "700px", margin: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#444" }}>Event Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="date"
                endAccessor="endDate"
                views={["month", "week", "day"]}
                defaultView="month"
                style={{
                    height: 700,
                    backgroundColor: "#f8f9fa", // Light background
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                }}
                eventPropGetter={eventStyleGetter} // Apply custom styles
                onSelectEvent={onEventClick} // Trigger when clicking an event
            />
        </div>
    );
};

export default CalendarView;
