const EventList = ({ eventData = [], loading }) => {
    const defaultImageUrl = 'https://via.placeholder.com/150'; // Placeholder image

    return (
        <div className="w-full bg-slate-100 event-list p-6">
            {loading ? (
                <p className="text-center text-lg font-medium">Loading...</p>
            ) : eventData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {eventData.map((event, index) => (
                        <div
                            key={event.id || index} // Use unique key
                            className="shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-200 flex flex-col items-center relative bg-white"
                        >
                            {/* Event Image */}
                            <div className="w-full h-40 overflow-hidden rounded-lg">
                                <img
                                    src={event.image_url || defaultImageUrl}
                                    alt={event.name || 'Image Coming Soon'}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            {/* Event Details */}
                            <div className="text-black w-full mt-4">
                                <h2 className="text-lg font-bold text-center mb-2 truncate">
                                    {event.name || 'Untitled Event'}
                                </h2>
                                <p className="text-sm">
                                    <strong>Type:</strong> {event.type || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Address:</strong> {event.address || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Time:</strong> {event.time || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Ticket Price:</strong> {event.ticket_price || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Date:</strong>{' '}
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                        {event.date || 'N/A'}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    <strong>Registration Link:</strong>{' '}
                                    {event.registration_link ? (
                                        <a
                                            href={event.registration_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline truncate block"
                                        >
                                            {event.registration_link.length > 20
                                                ? `${event.registration_link.slice(0, 20)}...`
                                                : event.registration_link}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleMoreClick(place._id)}
                                        className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                      Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg font-medium">No Events Found.</p>
            )}
        </div>
    );
};

export default EventList;
