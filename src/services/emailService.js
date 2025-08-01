const { transporter, createEmailTemplate } = require('../config/email');
const config = require('../config/app');

class EmailService {
  /**
   * Enviar email del formulario de contacto
   * @param {Object} contactData 
   * @param {string} contactData.name 
   * @param {string} contactData.email 
   * @param {string} contactData.message 
   * @returns {Promise<Object>} 
   */
  static async sendContactEmail(contactData) {
    const { name, email, message } = contactData;

    const mailOptions = {
      from: config.email.from,
      to: config.email.to,
      replyTo: email,
      subject: `🎯 Nuevo Contacto AIDET: ${name}`,
      html: createEmailTemplate(name, email, message),
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('Email enviado exitosamente:', result.messageId);
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new Error('Error al enviar el email');
    }
  }

  /**
   * Testear el servicio de email
   * @returns {Promise<boolean>} Resultado de la prueba
   */
  static async testConnection() {
    try {
      await transporter.verify();
      console.log('Email service conectado correctamente');
      return true;
    } catch (error) {
      console.error('Error en email service:', error);
      return false;
    }
  }
}

module.exports = EmailService; 