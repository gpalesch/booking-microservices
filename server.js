require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/auth',
  createProxyMiddleware({
    target: `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}`,
    changeOrigin: true,
  })
);

app.use(
  '/reservations',
  createProxyMiddleware({
    target: `http://${process.env.RESERVATION_SERVICE_HOST}:${process.env.RESERVATION_SERVICE_PORT}`,
    changeOrigin: true,
  })
);

app.use(
  '/rooms',
  createProxyMiddleware({
    target: `http://${process.env.ROOM_SERVICE_HOST}:${process.env.ROOM_SERVICE_PORT}`,
    changeOrigin: true,
  })
);

const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
