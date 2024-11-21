require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error: ${error}`);
    });

// Routes
app.use('/rooms', roomRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`room service running on port ${PORT}`));
