const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/app');
const contactRoutes = require('./routes/contactRoutes');

// Inicializar la app de Express
const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, config.static.path)));

// API Routes
app.use('/api', contactRoutes);

// Endpoint de health
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// SPA fallback - servir index.html para todas las rutas restantes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.static.path, 'index.html'));
});

// Manejo de errores middleware
app.use((error, req, res, next) => {
  console.error('❌ Error no manejado:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// Iniciar el servidor
const startServer = () => {
  app.listen(config.port, () => {
    console.log('Servidor AIDET iniciado');
    console.log(`Puerto: ${config.port}`);
    console.log(`Entorno: ${config.nodeEnv}`);
    console.log(`URL: http://localhost:${config.port}`);
  });
};

// Manejo de graceful
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

// Iniciar el servidor
startServer(); 