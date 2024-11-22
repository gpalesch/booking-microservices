const amqp = require('amqplib');

let connection;
let channel;

async function connectToRabbitMQ() {
  const retryInterval = 5000; // Temps d'attente entre chaque tentative (5s)
  const maxRetries = 10;     // Nombre maximum de tentatives
  let retries = 0;

  while (retries < maxRetries) {
      try {
          if (!connection) {
              connection = await amqp.connect('amqp://admin:admin@rabbitmq:5672');
              console.log('Connected to RabbitMQ');
          }
          if (!channel) {
              channel = await connection.createChannel();
          }
          return channel;
      } catch (error) {
          retries++;
          console.error(`Error connecting to RabbitMQ: ${error.message}. Retrying in ${retryInterval / 1000}s... (${retries}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
  }

  throw new Error('Unable to connect to RabbitMQ after multiple retries');
}

async function sendToQueue(queue, message) {
  try {
    const channel = await connectToRabbitMQ();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue "${queue}":`, message);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
  }
}

async function consumeFromQueue(queue, onMessage) {
  try {
    const channel = await connectToRabbitMQ();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Message received from queue "${queue}":`, msg.content.toString());
        onMessage(msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming message from RabbitMQ:', error);
  }
}

module.exports = { sendToQueue, consumeFromQueue };
