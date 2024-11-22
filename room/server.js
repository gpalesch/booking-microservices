require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const setupSwagger = require('./swagger');
const roomRoutes = require('./routes/roomRoutes');
const { consumeFromQueue, sendToQueue } = require('./amqplib');

const app = express();
app.use(express.json());
process.env.MONGO_URI = "mongodb://mongo-room:27017/roomdb";

async function connectToDatabase() {
    try {
        console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}`);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
}

app.use('/rooms', roomRoutes);

setupSwagger(app);

(async function setupRabbitMQ() {
    try {
        console.log(`Attempting to connect to RabbitMQ at ${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
        await consumeFromQueue('room_updates', (message) => {
            console.log(`Received message in room service: ${message}`);
        });
        console.log('RabbitMQ connection established');
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        process.exit(1); 
    }
})();

connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Room service running on port ${PORT}`));
});