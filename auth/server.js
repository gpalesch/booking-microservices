require('dotenv').config();
const express = require('express');
const setupSwagger = require('./swagger');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
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

app.use('/auth', authRoutes);

setupSwagger(app);

consumeFromQueue('user_registration', (message) => {
    console.log(`Received message in auth service: ${message}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
