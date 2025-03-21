const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

// Set PORT to a valid port number
const PORT = process.env.PORT || 5000; // Use 5000 or any other valid port

// Middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON requests with a 10MB limit
app.use(
  cors({
    origin: ['https://akash684.github.io', 'http://localhost:3000'], // Allow requests from these origins
    credentials: true, // Allow cookies and credentials
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Routes
app.use('/', Routes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error response
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at port no. ${PORT}`);
});