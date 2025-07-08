const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

// All admin routes require admin access
router.use(protect);
router.use(admin);

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Get recent orders
    const recentOrders = await Order.find({})
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5);

    // Get low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
        .select('name stock price')
        .limit(5);

    // Calculate total revenue
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Get monthly stats
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyOrders = await Order.find({
        createdAt: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1)
        }
    });

    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.json({
        success: true,
        data: {
            totalOrders,
            totalProducts,
            totalUsers,
            totalRevenue,
            monthlyRevenue,
            recentOrders,
            lowStockProducts
        }
    });
});

// @desc    Get sales analytics
// @route   GET /api/admin/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = asyncHandler(async (req, res) => {
    const { period = 'month' } = req.query;
    
    let startDate, endDate;
    const now = new Date();

    switch (period) {
        case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    endDate = now;

    const orders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
        isPaid: true
    });

    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = orders.length;

    res.json({
        success: true,
        data: {
            period,
            totalSales,
            totalOrders,
            averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0
        }
    });
});

// @desc    Get product analytics
// @route   GET /api/admin/analytics/products
// @access  Private/Admin
const getProductAnalytics = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments({});
    const activeProducts = await Product.countDocuments({ isActive: true });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // Get top selling products (based on orders)
    const orders = await Order.find({}).populate('orderItems.product');
    
    const productSales = {};
    orders.forEach(order => {
        order.orderItems.forEach(item => {
            if (item.product) {
                const productId = item.product._id.toString();
                if (!productSales[productId]) {
                    productSales[productId] = {
                        product: item.product,
                        totalSold: 0,
                        revenue: 0
                    };
                }
                productSales[productId].totalSold += item.quantity;
                productSales[productId].revenue += item.price * item.quantity;
            }
        });
    });

    const topSellingProducts = Object.values(productSales)
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 5);

    res.json({
        success: true,
        data: {
            totalProducts,
            activeProducts,
            lowStockProducts,
            outOfStockProducts,
            topSellingProducts
        }
    });
});

// @desc    Get user analytics
// @route   GET /api/admin/analytics/users
// @access  Private/Admin
const getUserAnalytics = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    
    // Get users registered this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const newUsersThisMonth = await User.countDocuments({
        role: 'user',
        createdAt: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1)
        }
    });

    // Get top customers by order value
    const orders = await Order.find({ isPaid: true }).populate('user', 'name email');
    
    const customerSpending = {};
    orders.forEach(order => {
        const userId = order.user._id.toString();
        if (!customerSpending[userId]) {
            customerSpending[userId] = {
                user: order.user,
                totalSpent: 0,
                orderCount: 0
            };
        }
        customerSpending[userId].totalSpent += order.totalPrice;
        customerSpending[userId].orderCount += 1;
    });

    const topCustomers = Object.values(customerSpending)
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);

    res.json({
        success: true,
        data: {
            totalUsers,
            activeUsers,
            newUsersThisMonth,
            topCustomers
        }
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    res.json({
        success: true,
        data: users
    });
});

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
    const { isAdmin } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    user.isAdmin = isAdmin;
    await user.save();
    
    res.json({
        success: true,
        message: 'User role updated successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    await user.remove();
    
    res.json({
        success: true,
        message: 'User deleted successfully'
    });
});

router.get('/dashboard', getDashboardStats);
router.get('/analytics/sales', getSalesAnalytics);
router.get('/analytics/products', getProductAnalytics);
router.get('/analytics/users', getUserAnalytics);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router; 