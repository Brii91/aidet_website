// Configuracion de la aplicación
const config = {
  // Configuracion del servidor
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuracion
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // Configuracion de email
  email: {
    from: process.env.EMAIL_FROM || 'britney.workmail91@gmail.com',
    to: process.env.EMAIL_TO || 'britney.workmail91@gmail.com'
  },
  
  // Configuracion de archivos estaticos
  static: {
    path: './public'
  }
};

module.exports = config; 