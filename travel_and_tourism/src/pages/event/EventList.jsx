const EventList = ({ eventData = [], loading }) => {
    const defaultImageUrl = 'https://via.placeholder.com/150'; // Placeholder image
    console.log("Event Data:", eventData);

    return (
        <div className="w-full bg-slate-100 event-list">
            {loading ? (
                <p>Loading...</p>
            ) : eventData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {eventData.map((event, index) => (
                        <div
                            key={event.id || index} // Use unique key
                            className="shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-200 flex flex-col items-center relative"
                        >
                            <div className="w-full h-48">
                                <img
                                    src={event.image_url || defaultImageUrl}
                                    alt={event.name || 'Image Coming Soon'}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-black w-full mt-4">
                                <div className="container mx-auto p-4 h-64 overflow-auto rounded-lg">
                                    <h2 className="text-xl font-semibold text-center">{event.name || 'Untitled Event'}</h2>
                                    <p><strong>Type:</strong> {event.type || 'N/A'}</p>
                                    <p><strong>Address:</strong> {event.address || 'N/A'}</p>
                                    <p><strong>Time:</strong> {event.time || 'N/A'}</p>
                                    <p><strong>Ticket Price:</strong> {event.ticket_price || 'N/A'}</p>
                                    <p><strong>Date:</strong> {event.date || 'N/A'}</p>
                                    <p>
                                        <strong>Registration Link:</strong>{' '}
                                        {event.registration_link ? (
                                            <a
                                                href={event.registration_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {event.registration_link.length > 10
                                                    ? `${event.registration_link.slice(0, 10)}...`
                                                    : event.registration_link}
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Events Found.</p>
            )}
        </div>
    );
};
export default EventList;
