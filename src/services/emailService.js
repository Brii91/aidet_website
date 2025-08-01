const { transporter, createEmailTemplate } = require('../config/email');
const config = require('../config/app');

class EmailService {
  /**
   * Send contact form email
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - Contact name
   * @param {string} contactData.email - Contact email
   * @param {string} contactData.message - Contact message
   * @returns {Promise<Object>} Email send result
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
      console.log('✅ Email enviado exitosamente:', result.messageId);
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('❌ Error al enviar email:', error);
      throw new Error('Error al enviar el email');
    }
  }

  /**
   * Test email service
   * @returns {Promise<boolean>} Test result
   */
  static async testConnection() {
    try {
      await transporter.verify();
      console.log('✅ Email service conectado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error en email service:', error);
      return false;
    }
  }
}

module.exports = EmailService; 