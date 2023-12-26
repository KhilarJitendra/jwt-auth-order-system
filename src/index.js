const express = require('express');
const connectDB = require('../config/dbConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
