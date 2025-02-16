const Event = require("../models/Events");

// likes or unlikes

const toggleLike = async (req, res) => {
  try {
    const { eventId } = req.params; // getting event id from the api
    const { userId } = req.body; // getting user id from client side

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: " Event not found" }); // error message
    }

    const likeIndex = event.likes.indexOf(userId);
    if (likeIndex == -1) {
      event.likes.push(userId);
    } else {
      event.likes.splice(likeIndex, 1);
    }
    console.log("event count", event.likes.length);
    await event.save();
    res
      .status(201)
      .json({ success: true, likes: event.likes.length, eventId: event.id });
  } catch (error) {
    console.log(
      "file(commennt_likes_controllers, Error in adding likes; ",
      error
    );
    res.status(500).json({
      message: " Error in adding the like in the database or server error ",
      error,
    }); // error in adding the like in the server
  }
};

const commentHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId, userName, comment } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not Found" });
    }
    event.comments.push({ userId, userName, comment }); // pushing the comment username and user id in the data base of event
    await event.save();
    res.status(200),
      json({ message: "comment added successfully", comments: event.comments });
  } catch (error) {
    console.log(
      "file(commennt_likes_controllers, Error in adding likes; ",
      error
    );
    res.status(500).json({
      message: "Error in adding the comment to the database",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { eventId, commentId } = req.params; // requesting id from the api
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).josn({ message: "comment not found" }); // comment searching
    }

    const commnentIndex = event.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commnentIndex === -1) {
      return res.status(404).json({ message: "comment not found" });
    }
    // reomve the comment
    event.comments.splice(commnentIndex, 1);
    await event.save(); // saving deleted comment in the event data base
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (error) {
    console.log("Error in deleting the comment", error);
    res
      .status(500)
      .json({ message: "Error in deleting the comment", error: error.message });
  }
};

const clearAllLikes = async (req, res) => {
  try {
    await Event.updateMany({}, { $set: { likes: [] } });
    res.status(200).json({success:true, message: "successfully removed all likes" })
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error in deleting all likes", error });
  }
};

module.exports = { toggleLike, commentHandler, deleteComment, clearAllLikes };
