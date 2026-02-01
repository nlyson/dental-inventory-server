const express = require('express');
const router = express.Router();
const { analyzeEquipment } = require('../services/openAI');

/**
 * POST /analyze-equipment
 * Analyze procedures to determine equipment usage
 * Body: { procedures: [...] }
 */
router.post('/', async (req, res) => {
  try {
    const { procedures } = req.body;

    if (!procedures || !Array.isArray(procedures)) {
      return res.status(400).json({
        error: 'Missing or invalid procedures',
        message: 'Request body must contain a procedures array'
      });
    }

    if (procedures.length === 0) {
      return res.status(400).json({
        error: 'Empty procedures array',
        message: 'At least one procedure is required for analysis'
      });
    }

    const analysis = await analyzeEquipment(procedures);

    res.json({
      success: true,
      procedureCount: procedures.length,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing equipment:', error);
    res.status(500).json({
      error: 'Failed to analyze equipment',
      message: error.message
    });
  }
});

module.exports = router;
