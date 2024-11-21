require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error: ${error}`);
    });

app.use('/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`room service running on port ${PORT}`));
