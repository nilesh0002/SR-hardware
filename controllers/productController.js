const Product = require('../models/Product');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            $or: [
                {
                    name: {
                        $regex: req.query.keyword,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: req.query.keyword,
                        $options: 'i'
                    }
                }
            ]
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {};

    const count = await Product.countDocuments({ ...keyword, ...category, ...brand, isActive: true });
    const products = await Product.find({ ...keyword, ...category, ...brand, isActive: true })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        data: products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product && product.isActive) {
        res.json({
            success: true,
            data: product
        });
    } else {
        return res.status(404).json({ error: 'Product not found' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.json({
        success: true,
        data: product
    });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await product.remove();

    res.json({
        success: true,
        message: 'Product removed'
    });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isFeatured: true, isActive: true })
        .limit(8)
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        data: products
    });
});

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ 
        category: req.params.category, 
        isActive: true 
    });
    
    const products = await Product.find({ 
        category: req.params.category, 
        isActive: true 
    })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        data: products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category', { isActive: true });
    
    res.json({
        success: true,
        data: categories
    });
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Product.distinct('brand', { isActive: true });
    
    res.json({
        success: true,
        data: brands.filter(brand => brand) // Remove null/undefined values
    });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getProductsByCategory,
    getCategories,
    getBrands
}; 