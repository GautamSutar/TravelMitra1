const Events = require("../models/Events");
const User = require('../models/User'); // Adjust the path based on your file structure



const addCommentAndRating = async (req, res) => {
    try {
        const { placeId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        // Fetch user details to retrieve the username
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const place = await Events.findById(placeId);
        if (!place) return res.status(404).json({ message: 'Place not found' });

        const existingCommentIndex = place.comments.findIndex(
            c => c.user && c.user.toString() === userId.toString()
        );

        if (existingCommentIndex !== -1) {
            // Update existing comment
            place.comments[existingCommentIndex].rating = rating;
            place.comments[existingCommentIndex].comment = comment;
            place.comments[existingCommentIndex].createdAt = Date.now();
        } else {
            // Add new comment with the user's name
            place.comments.push({
                user: userId,
                username: user.name, // Store the username from the User model
                rating,
                comment,
                createdAt: Date.now()
            });
        }

        await place.save();
        res.status(200).json({ message: 'Comment and rating added successfully', place });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding comment and rating', error });
    }
};









//getting the user comment and rating

const getPlaceWithComment_Rating = async (req, res) => {
    try {
        const { placeId } = req.params;

        // Fetch only the comments array with populated user information
        const place = await Places.findById(placeId, 'comments')
            .populate('comments.user', 'username');

        if (!place) return res.status(404).json({ message: 'Place not found' });

        // Respond with only the comments array
        res.status(200).json(place.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments and ratings', error });
    }
};


// ********* Deleting comment and rating **********

const deleteCommentRating = async (req, res) => {
    try {
        const { placeId, commentId } = req.params; // Retrieve placeId and commentId from params
        const userId = req.user._id; // ID of the logged-in user

        // Find the place document by its ID
        const place = await Places.findById(placeId);
        console.log(place);
        if (!place) return res.status(404).json({ message: 'Place not found' });

        console.log(`Looking for comment with ID: ${commentId} by user: ${userId}`);

        // Find the index of the comment to be deleted
        const commentIndex = place.comments.findIndex((comment) => {
            console.log(`Checking comment: ${comment._id}, user: ${comment.user}`);
            return comment && comment._id.toString() === commentId && comment.user && comment.user.toString() === userId.toString();
        });

        // If comment is not found or user is unauthorized, return error
        if (commentIndex === -1) {
            console.log("Comment not found or unauthorized");
            return res.status(404).json({ message: 'Comment not found or unauthorized' });
        }

        // Remove the comment from the array
        place.comments.splice(commentIndex, 1);

        // Save the updated place document
        await place.save();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};



module.exports = { addCommentAndRating, getPlaceWithComment_Rating, deleteCommentRating };



