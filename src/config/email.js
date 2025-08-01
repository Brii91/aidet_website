const nodemailer = require('nodemailer');

// Configuración de email
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'britney.workmail91@gmail.com',
    pass: process.env.EMAIL_PASS || 'bqgo nmte lepz zxho'
  }
};

// Crear transporter
const transporter = nodemailer.createTransport(emailConfig);

// Función de plantilla de email
const createEmailTemplate = (name, email, message) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto - AIDET</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4154f1 0%, #012970 100%); padding: 30px; text-align: center;">
            <img src="https://via.placeholder.com/120x60/ffffff/4154f1?text=AIDET" alt="AIDET Logo" style="max-width: 120px; margin-bottom: 15px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Nuevo Mensaje de Contacto</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Educación en Ingeniería a tu Medida</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #4154f1; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #012970; margin: 0 0 15px 0; font-size: 20px;">📧 Detalles del Mensaje</h2>
                
                <div style="margin-bottom: 20px;">
                    <strong style="color: #4154f1; display: inline-block; width: 80px;">👤 Nombre:</strong>
                    <span style="color: #333; font-weight: 500;">${name}</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <strong style="color: #4154f1; display: inline-block; width: 80px;">📧 Email:</strong>
                    <a href="mailto:${email}" style="color: #4154f1; text-decoration: none; font-weight: 500;">${email}</a>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <strong style="color: #4154f1; display: inline-block; width: 80px;">📅 Fecha:</strong>
                    <span style="color: #333; font-weight: 500;">${new Date().toLocaleString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #012970; margin: 0 0 15px 0; font-size: 18px;">💬 Mensaje:</h3>
                <div style="color: #555; line-height: 1.6; font-size: 16px; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                    <strong>⚡ Respuesta Rápida:</strong> Puedes responder directamente a este email para contactar con ${name}
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #012970; padding: 25px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 12px; opacity: 0.8;">
                © 2024 AIDET - Adaptive Intelligent Digital Engineering Tutor<br>
                Todos los derechos reservados
            </p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
  transporter,
  createEmailTemplate
}; 