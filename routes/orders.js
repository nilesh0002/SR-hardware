const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/auth');
const {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');

// Protected routes
router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/', admin, getOrders);
router.put('/:id/deliver', admin, updateOrderToDelivered);
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router; 