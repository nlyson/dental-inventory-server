const express = require('express');
const router = express.Router();
const { fetchProcedures } = require('../services/openDental');

/**
 * GET /fetch-procedures
 * Fetch procedures from OpenDental API
 * Query params: startDate, endDate (YYYY-MM-DD format)
 */
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Both startDate and endDate query parameters are required (YYYY-MM-DD format)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    const procedures = await fetchProcedures(startDate, endDate);

    res.json({
      success: true,
      count: procedures.length,
      startDate,
      endDate,
      procedures
    });
  } catch (error) {
    console.error('Error fetching procedures:', error);
    res.status(500).json({
      error: 'Failed to fetch procedures',
      message: error.message
    });
  }
});

module.exports = router;
