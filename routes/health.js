const express = require('express');
const router = express.Router();
const { testConnection } = require('../services/database');

/**
 * GET /health
 * Health check endpoint - no authentication required
 */
router.get('/', async (req, res) => {
  const dbConnected = await testConnection();

  res.json({
    status: dbConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    service: 'dental-inventory-server',
    version: '1.0.0',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

module.exports = router;
