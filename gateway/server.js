const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy vers les services
app.use('/auth', createProxyMiddleware({ target: 'http://auth-service:3000', changeOrigin: true }));
app.use('/reservations', createProxyMiddleware({ target: 'http://reservation-service:3000', changeOrigin: true }));
app.use('/rooms', createProxyMiddleware({ target: 'http://room-service:3000', changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
