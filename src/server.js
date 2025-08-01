const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/app');
const contactRoutes = require('./routes/contactRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, config.static.path)));

// API Routes
app.use('/api', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.static.path, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Error no manejado:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// Start server
const startServer = () => {
  app.listen(config.port, () => {
    console.log('🚀 Servidor AIDET iniciado');
    console.log(`📍 Puerto: ${config.port}`);
    console.log(`🌍 Entorno: ${config.nodeEnv}`);
    console.log(`📧 Email: ${config.email.from}`);
    console.log(`🔗 URL: http://localhost:${config.port}`);
    console.log(`💚 Health: http://localhost:${config.port}/health`);
  });
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

// Start the server
startServer(); 