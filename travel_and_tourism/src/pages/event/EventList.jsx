import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react"; // Import icon
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const EventList = ({ eventData = [], loading }) => {
  const defaultImageUrl = "https://via.placeholder.com/150"; // Placeholder image
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [likes, setLikes] = useState({}); // Store likes count for each event
  const [likedEvents, setLikedEvents] = useState([]); /// Store liked event IDs
  // const [liked, setLiked] = useState(eventData.likes?.includes(userId));
  // const [idEvent, setIdEvent] = useState(null);
  const [comments, setComments] = useState(eventData.comments);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT token
        setUser({ id: decoded.id, name: decoded.name, email: decoded.email }); // Set user details
      } catch (error) {
        console.log(
          "fileFrontend (fetchBookingDetails.jsx) Error in decoding the jwtToken: ",
          error
        );
        console.error("fileFrontend (Booking.jsx) = Invalid token:", error);
      }
    }
  }, []);

  // debugging the name and id of the user
  console.log("user name is: ", user.name);
  console.log("user Id is: ", user.id);

  const handleLike = async (eventId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/comment-likes/like/${eventId}`,
        { userId: user.id }
      );

      setLikes((prevLikes) => ({
        ...prevLikes,
        [eventId]: response.data.likes, // Update only the specific event's likes count
      }));

      setLikedEvents(
        (prevLiked) =>
          prevLiked.includes(eventId)
            ? prevLiked.filter((id) => id !== eventId) // Remove from liked events
            : [...prevLiked, eventId] // Add to liked events
      );
    } catch (error) {
      console.error("Error in liking", error);
    }
  };

  // Handle comment submission
  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/comment-likes/comment/${eventData._Id}`,
        {
          userId: user.id,
          userName: user.name,
          comment: commentText,
        }
      );
    } catch (error) {}
  };

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
                  alt={event.name || "Image Coming Soon"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Event Details */}
              <div className="text-black w-full mt-4">
                <h2 className="text-lg font-bold text-center mb-2 truncate">
                  {event.name || "Untitled Event"}
                </h2>
                <p className="text-sm">
                  <strong>Type:</strong> {event.type || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong>{" "}
                  {expanded ? (
                    event.address
                  ) : (
                    <>
                      {event.address.length > 50
                        ? event.address.substring(0, 50) + "..."
                        : event.address}{" "}
                      {event.address.length > 50 && (
                        <button
                          onClick={() => setExpanded(true)}
                          className="text-blue-500 underline"
                        >
                          Read More
                        </button>
                      )}
                    </>
                  )}
                </p>
                <p className="text-sm">
                  <strong>Time:</strong> {event.time || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Ticket Price:</strong> {event.ticket_price || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong>{" "}
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {event.date || "N/A"}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Registration Link:</strong>{" "}
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
                    "N/A"
                  )}
                </p>

                {/* ********** Like And Comment ***********  */}

                <div className="mt-4">
                  {/* likes and comment  */}
                  <div className=" flex items-center justify-center gap-20 mb-4">
                    {/* likes button */}
                    <button
                      onClick={() => handleLike(event.id)}
                      className={`flex items-center space-x-1 ${
                        likedEvents.includes(event.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                      <span>
                        {likes[event.id] !== undefined
                          ? likes[event.id]
                          : event.likes?.length || 0}
                      </span>
                    </button>

                    {/* comment button */}
                    <button
                      onClick={() => setShowComments(!showComments)}
                      className="flex items-center gap-1 text-blue-500 "
                    >
                      <MessageCircle size={24} />
                      <span>{comments?.length}</span>
                    </button>
                  </div>

                  {/* comment section */}
                  {showComments && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)} // setting the comment
                        placeholder="Write a comment..."
                        className="w-full border rounded p-2"
                      />
                      <button
                        onClick={handleComment}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                      >
                        Post Comment
                      </button>

                      <div className="mt-2">
                        {comments?.map((comment) => {
                          <div key={comment._id} className="border-b-2 py-2">
                            <p className="font-semibold">{comment.userName}</p>
                            <p className="text-gray-600">{comment.comment}</p>
                          </div>;
                        })}
                      </div>
                    </div>
                  )}

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
