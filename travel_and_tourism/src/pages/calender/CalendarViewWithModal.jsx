import React, { useState } from "react";
import Modal from "react-modal";
import CalendarView from "./CalendarView"; // Ensure you import the CalendarView component correctly

const CalendarViewWithModal = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Handle when an event is clicked
    const handleEventClick = (events) => {
        setSelectedEvent(events);
    };

    // Close the modal
    const closeModal = () => setSelectedEvent(null);

    return (
        <div>
            {/* Render the CalendarView component */}
            <CalendarView events={events} onEventClick={handleEventClick} />

            {/* Show Modal if an event is selected */}
            {
                selectedEvent && (
                    <Modal isOpen onRequestClose={closeModal} ariaHideApp={false}>
                        <div style={{ padding: "20px", textAlign: "center" }}>
                            <h2>{selectedEvent.title}</h2>
                            <p><strong>Description:</strong> {selectedEvent.description || "No description available"}</p>
                            <p><strong>Date:</strong> {new Date(selectedEvent.start).toDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(selectedEvent.end).toDateString()}</p>
                            <p><strong>Type:</strong> {selectedEvent.type || "Not specified"}</p>
                            <button
                                onClick={closeModal}
                                style={{
                                    marginTop: "15px",
                                    padding: "10px 20px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </Modal>
                )}
        </div>
    );
};

export default CalendarViewWithModal;
