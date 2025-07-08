const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user.id, isActive: true })
        .populate('items.product', 'name price images stock');

    if (!cart) {
        cart = await Cart.create({
            user: req.user.id,
            items: [],
            totalAmount: 0,
            totalItems: 0
        });
    }

    res.json({
        success: true,
        data: cart
    });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user.id, isActive: true });

    if (!cart) {
        cart = await Cart.create({
            user: req.user.id,
            items: [],
            totalAmount: 0,
            totalItems: 0
        });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].price = product.price;
    } else {
        // Add new item
        cart.items.push({
            product: productId,
            quantity,
            price: product.price
        });
    }

    await cart.save();

    // Populate product details
    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        data: cart
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
    }

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = product.price;

    await cart.save();
    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        data: cart
    });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        data: cart
    });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json({
        success: true,
        data: cart
    });
});

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
const getCartCount = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });

    const count = cart ? cart.totalItems : 0;

    res.json({
        success: true,
        data: { count }
    });
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount
}; 