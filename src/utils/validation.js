// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateContactForm = (data) => {
  const { name, email, message } = data;
  const errors = [];

  // Validar nombre
  if (!name?.trim()) {
    errors.push('El nombre es obligatorio');
  } else if (name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  // Validar email
  if (!email?.trim()) {
    errors.push('El email es obligatorio');
  } else if (!validateEmail(email.trim())) {
    errors.push('El formato del email no es válido');
  }

  // Validar mensaje
  if (!message?.trim()) {
    errors.push('El mensaje es obligatorio');
  } else if (message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validateContactForm
}; 