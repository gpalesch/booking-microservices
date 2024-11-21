require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const setupSwagger = require('./swagger');
const roomRoutes = require('./routes/roomRoutes');
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

app.use('/rooms', roomRoutes);

setupSwagger(app);

consumeFromQueue('room_updates', (message) => {
    console.log(`Received message in room service: ${message}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Room service running on port ${PORT}`));
