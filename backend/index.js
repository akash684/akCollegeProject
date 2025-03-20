const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

// Set PORT to a valid port number
const PORT = process.env.PORT || 5000; // Use 5000 or any other valid port

dotenv.config();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: ['https://akash684.github.io', 'http://localhost:3000'],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at port no. ${PORT}`);
});