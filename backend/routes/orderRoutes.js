const express = require('express');
const { protect } = require('../middlewares/authMiddleware');

const {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderToPaid
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);
router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/:id', protect, getOrderById);

module.exports = router;