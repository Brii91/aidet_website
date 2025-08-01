const express = require('express');
const ContactController = require('../controllers/contactController');

const router = express.Router();

// Contact form submission
router.post('/contact', ContactController.submitContact);

// Health check endpoint
router.get('/health', ContactController.healthCheck);

module.exports = router; 