import React, { useState } from "react";
import Modal from "react-modal";

const CalendarViewWithModal = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => setSelectedEvent(null);

    return (
        <div>
            <CalendarView events={events} onEventClick={handleEventClick} />

            {selectedEvent && (
                <Modal isOpen onRequestClose={closeModal} ariaHideApp={false}>
                    <h2>{selectedEvent.title}</h2>
                    <p>{selectedEvent.description}</p>
                    <p><strong>Date:</strong> {new Date(selectedEvent.start).toDateString()}</p>
                    <p><strong>Type:</strong> {selectedEvent.type}</p>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default CalendarViewWithModal;
