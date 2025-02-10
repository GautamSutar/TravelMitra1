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
    Default: "#007BFF", // Default Blue for events with no category
};

const CalendarView = ({ events, onEventClick }) => {
    // Customize event styles based on category
    const eventStyleGetter = (event) => {
        const backgroundColor = categoryColors[event.category] || categoryColors.Default;
        return {
            style: {
                backgroundColor,
                color: "gray",
                borderRadius: "8px",
                padding: "8px",
                border: "2px solid #ddd",
                boxShadow: "5px 2px 5px rgba(0, 0, 0.9, 0.9)",
            },
        };
    };

    return (
        <div style={{ height: "700px", margin: "20px auto", maxWidth: "90%" }}>
            <h2 style={{ textAlign: "center", color: "#444", marginBottom: "20px" }}>
                Event Calendar
            </h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start" // Corrected accessor to "start"
                endAccessor="end" // Corrected accessor to "end"
                views={["month", "week", "day"]}
                defaultView="month"
                style={{
                    height: 500,
                    backgroundColor: "#aA59gb", // Light background
                    border: "2px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                }}
                eventPropGetter={eventStyleGetter} // Apply custom styles to events
                onSelectEvent={onEventClick} // Handle event clicks
            />
        </div>
    );
};

export default CalendarView;
