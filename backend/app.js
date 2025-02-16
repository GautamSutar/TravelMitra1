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
const mainRouter = require('./routes/AllRoutes');
const app = express();

// Port 
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "", // Frontend deployed
  "http://localhost:3000", // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and authorization headers
    methods: "GET,POST,PUT,DELETE",
  })
);



// app.use(cors(
//     {
//         origin: 'https://stalwart-mooncake-94d96c.netlify.app/',
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// ));




// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to MongoDB
connectDB();

// Path for static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// app.use('/api/auth', userRoutes);
// app.use('/api/place', userRoutes);
// app.use('/api/trip', userRoutes);
// app.use('/api/pic', userRoutes);
// app.use('/api/delete', userRoutes);
// app.use('/api/budget', userRoutes);
// app.use('/api/rate-comment', userRoutes);
// app.use('/api/college', userRoutes);
// app.use('/api/event', userRoutes);
// app.use('/api/iconic', userRoutes);
// app.use('/api/hidden', userRoutes);
// app.use('/api/fest', userRoutes);
// app.use('/api/hotel', userRoutes);
// app.use('/api/payments', userRoutes);


app.use('/api', mainRouter); // All routes will be prefixed with /api

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Frontend URL
        methods: ['GET', 'POST']
    }
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
