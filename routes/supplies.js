const express = require('express');
const router = express.Router();
const { fetchSupplies, fetchSupplyOrders, fetchSuppliers } = require('../services/openDental');

/**
 * GET /supplies
 * Fetch all supplies from OpenDental database
 */
router.get('/', async (req, res) => {
  try {
    const supplies = await fetchSupplies();
    res.json({
      success: true,
      count: supplies.length,
      supplies
    });
  } catch (error) {
    console.error('Error fetching supplies:', error);
    res.status(500).json({
      error: 'Failed to fetch supplies',
      message: error.message
    });
  }
});

/**
 * GET /supplies/orders
 * Fetch recent supply orders
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await fetchSupplyOrders();
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching supply orders:', error);
    res.status(500).json({
      error: 'Failed to fetch supply orders',
      message: error.message
    });
  }
});

/**
 * GET /supplies/suppliers
 * Fetch all suppliers
 */
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await fetchSuppliers();
    res.json({
      success: true,
      count: suppliers.length,
      suppliers
    });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({
      error: 'Failed to fetch suppliers',
      message: error.message
    });
  }
});

module.exports = router;
