const EmailService = require('../services/emailService');
const { validateContactForm } = require('../utils/validation');

class ContactController {
  /**
   * Manejar envio de formulario de contacto
   * @param {Object} req 
   * @param {Object} res 
   */
  static async submitContact(req, res) {
    try {
      const { name, email, message } = req.body;

      // Validar datos del formulario
      const validation = validateContactForm({ name, email, message });
      
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: validation.errors.join(', ')
        });
      }

      // Enviar email
      const emailResult = await EmailService.sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      });

      // Log de envio de contacto
      console.log('📧 Nuevo contacto recibido:', {
        name: name.trim(),
        email: email.trim(),
        timestamp: new Date().toISOString()
      });

      res.status(200).json({
        success: true,
        message: 'Mensaje enviado correctamente',
        messageId: emailResult.messageId
      });

    } catch (error) {
      console.error('❌ Error en contacto:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  /**
   * Endpoint de health
   * @param {Object} req 
   * @param {Object} res 
   */
  static async healthCheck(req, res) {
    try {
      const emailServiceStatus = await EmailService.testConnection();
      
      res.status(200).json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        services: {
          email: emailServiceStatus ? 'connected' : 'disconnected'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 'ERROR',
        error: error.message
      });
    }
  }
}

module.exports = ContactController; 