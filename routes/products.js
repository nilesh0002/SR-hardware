const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/auth');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getProductsByCategory,
    getCategories,
    getBrands
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router; 