const express = require('express');
const router = express.Router();

/**
 * GET /health
 * Health check endpoint - no authentication required
 */
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'dental-inventory-server',
    version: '1.0.0'
  });
});

module.exports = router;
