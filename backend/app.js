const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
require('events').EventEmitter.prototype._maxListeners = 100;
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Route
const userRoutes = require('./routes/allRoute');
const app = express();

// Port 
const PORT = process.env.PORT || 5000;



app.use(cors(
    {
        origin: 'https://stalwart-mooncake-94d96c.netlify.app/',
        methods: ['GET', 'POST'],
        credentials: true,
    }
));




// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to MongoDB
connectDB();

// Path for static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/place', userRoutes);
app.use('/api/trip', userRoutes);
app.use('/api/pic', userRoutes);
app.use('/api/delete', userRoutes);
app.use('/api/budget', userRoutes);
app.use('/api/rate-comment', userRoutes);
app.use('/api/college', userRoutes);
app.use('/api/event', userRoutes);
app.use('/api/iconic', userRoutes);
app.use('/api/hidden', userRoutes);
app.use('/api/fest', userRoutes);
app.use('/api/hotels', userRoutes);
app.use('/api/payments', userRoutes);

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Frontend URL
        methods: ['GET', 'POST']
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // User joins their unique room based on userId
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    // Handle incoming messages and emit to the receiver's room
    socket.on('message', (data) => {
        const { senderId, receiverId, content } = data;
        console.log(`Received message from ${senderId} to ${receiverId}: ${content}`);
        io.to(receiverId).emit('message', { sender: senderId, content });
        console.log(`Message sent from ${senderId} to ${receiverId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Use `server.listen()` instead of `app.listen()` for Socket.IO to work correctly
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



//  http://localhost:5000/api/auth/login

//  http://localhost:5000/api/auth/register

//  http://localhost:5000/api/auth/logout

//  http://localhost:5000/api/auth/protected-route

//  http://localhost:5000/api/auth/protected-route

//  http://localhost:5000/api/auth/getAllUser

//  http://localhost:5000/api/place/createplace

//  http://localhost:5000/api/place/searchplace?type=all

//  http://localhost:5000/api/delete/deleteAll

//  http://localhost:5000/api/auth/forgot-password

//  http://localhost:5000/api/trip/addingTrip

//  http://localhost:5000/api/trip/allPlannedTrip

//  http://localhost:5000/api/trip/deletingTrip/671bbc3908e24b1c7496c603

//  http://localhost:5000/api/delete/deleteTrip

//  http://localhost:5000/api/pic/upload-profile-pic

//  http://localhost:5000/api/rate-comment/createComment/671d1f462ffce6f49e5fecb4

//  http://localhost:5000/api/rate-comment/getomm-rat

//  http://localhost:5000/api/rate-comment/deleteComment-rating

//  http://localhost:5000/api/auth/verify-otp

//  http://localhost:5000/api/rate-comment/getComment-rating/671d1f462ffce6f49e5fecb4

// http://localhost:5000/api/college/addCollege

// http://localhost:5000/api/college/searchCollege?type=enginnering

// http://localhost:5000/api/iconic/person