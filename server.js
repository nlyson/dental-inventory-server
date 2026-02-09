require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { apiKeyAuth } = require('./middleware/auth');
const healthRoutes = require('./routes/health');
const proceduresRoutes = require('./routes/procedures');
const equipmentRoutes = require('./routes/equipment');
const suppliesRoutes = require('./routes/supplies');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/fetch-procedures', apiKeyAuth, proceduresRoutes);
app.use('/analyze-equipment', apiKeyAuth, equipmentRoutes);
app.use('/supplies', apiKeyAuth, suppliesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Dental Inventory Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
