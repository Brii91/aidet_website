const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

// Configuracion
const CONFIG = {
  PORT: process.env.PORT || 3001,
  EMAIL: {
    SERVICE: 'gmail',
    USER: 'britney.workmail91@gmail.com',
    PASS: 'bqgo nmte lepz zxho',
    TO: 'britney.workmail91@gmail.com'
  }
};

// Inicializar el servidor
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// configuracion del transportador de correo
const createTransporter = () => {
  return nodemailer.createTransport({
    service: CONFIG.EMAIL.SERVICE,
  auth: {
      user: CONFIG.EMAIL.USER,
      pass: CONFIG.EMAIL.PASS
    }
  });
};

// Validation utilities
const validateContactForm = (data) => {
  const { name, email, message } = data;
  const errors = [];
  
  if (!name?.trim()) errors.push('El nombre es obligatorio');
  if (!email?.trim()) errors.push('El email es obligatorio');
  if (!message?.trim()) errors.push('El mensaje es obligatorio');
  
  // Validacion basica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('El formato del email no es válido');
  }
  
  return errors;
};

// utilidades de email
const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: CONFIG.EMAIL.USER,
    to: CONFIG.EMAIL.TO,
    replyTo: contactData.email,
    subject: `Nuevo mensaje de contacto de ${contactData.name}`,
    text: `
      Nombre: ${contactData.name}
      Email: ${contactData.email}
      Mensaje: ${contactData.message}
    `,
    html: `
      <h3>Nuevo mensaje de contacto</h3>
      <p><strong>Nombre:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
    `
  };
  
  return transporter.sendMail(mailOptions);
};

// utilidad de registro
const logContactMessage = (contactData) => {
  console.log('Nuevo mensaje de contacto:');
  console.log(`   Nombre: ${contactData.name}`);
  console.log(`   Email: ${contactData.email}`);
  console.log(`   Mensaje: ${contactData.message}`);
};

// utilidad de respuesta
const sendResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

const sendError = (res, statusCode, message) => {
  return sendResponse(res, statusCode, { error: message });
};

const sendSuccess = (res, data) => {
  return sendResponse(res, 200, data);
};

// endpoint del formulario de contacto
app.post('/contact', async (req, res) => {
  try {
    const contactData = req.body;
    
    // Validacion de datos del formulario
    const validationErrors = validateContactForm(contactData);
    if (validationErrors.length > 0) {
      return sendError(res, 400, validationErrors.join(', '));
    }
    
    // Log del mensaje de contacto
    logContactMessage(contactData);
    
    // Enviar correo
    const emailResult = await sendContactEmail(contactData);
    
    console.log('✅ Correo enviado:', emailResult.response);
    return sendSuccess(res, { 
      message: 'Mensaje recibido y correo enviado correctamente.',
      messageId: emailResult.messageId 
    });
    
  } catch (error) {
    console.error('❌ Error al procesar el formulario de contacto:', error);
    return sendError(res, 500, 'Error interno del servidor. Intenta de nuevo más tarde.');
  }
});

// endpoint de verificacion de salud
app.get('/health', (req, res) => {
  return sendSuccess(res, { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// fallback de SPA - servir index.html para todas las rutas restantes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  return sendError(res, 500, 'Error interno del servidor');
});

// Iniciar el servidor
const startServer = () => {
  app.listen(CONFIG.PORT, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${CONFIG.PORT}`);
    console.log(`Endpoint de contacto: http://localhost:${CONFIG.PORT}/contact`);
    console.log(` Health check: http://localhost:${CONFIG.PORT}/health`);
  });
};

// Manejo de apagado limpio
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

// Iniciar el servidor
startServer();
