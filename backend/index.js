const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = 100;
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const mainRouter = require("./routes/AllRoutes"); // Route


// Port
const PORT = process.env.PORT || 5000;

// const allowedOrigins = ["http://localhost:5173"]; // Add the specific origins you want to allow
const allowedOrigins = ["https://travel-mitra1-kw8x.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json());
app.use(bodyParser.json());
connectDB();// Connect to MongoDB

// Path for static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", mainRouter); // All routes will be prefixed with /api



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Use `server.listen()` instead of `app.listen()` for Socket.IO to work correctly
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
