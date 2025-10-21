const express = require('express');
const { protect } = require('../middlewares/authMiddleware');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', protect, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
