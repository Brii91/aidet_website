const express = require('express');
const ContactController = require('../controllers/contactController');

const router = express.Router();

// Envío del formulario de contacto
router.post('/contact', ContactController.submitContact);

// Endpoint de health
router.get('/health', ContactController.healthCheck);

module.exports = router; 