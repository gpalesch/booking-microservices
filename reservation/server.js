require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const setupSwagger = require('./swagger');
const reservationRoutes = require('./routes/reservationRoutes');
const { consumeFromQueue, sendToQueue } = require('./amqplib');

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

setupSwagger(app);

consumeFromQueue('reservation_requests', (message) => {
    console.log(`Received message in reservation service: ${message}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Reservation service running on port ${PORT}`));
