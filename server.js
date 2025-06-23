const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// === CONFIGURE THESE ===
const ADMIN_EMAIL = 'nilesh.singh0032@gmail.com'; // <-- Put your email here
const EMAIL_USER = 'nilesh.singh7829@gmail.com'; // <-- Your Gmail address
const EMAIL_PASS = '9950299916'; // <-- Gmail App Password (not your main password)
// =======================

const USERS_FILE = path.join(__dirname, 'users.json');

// Serve static files (HTML, CSS, images)
app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'utu_hardware_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Middleware: Protect all routes except login/signup
app.use((req, res, next) => {
    const publicPaths = [
        '/login', '/signup', '/login.html', '/signup.html', '/styles.css'
    ];
    if (
        publicPaths.includes(req.path) ||
        req.path.startsWith('/images') ||
        req.path.startsWith('/favicon')
    ) {
        return next();
    }
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    next();
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Helper: Load users
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
// Helper: Save users
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// SIGNUP
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
        return res.status(400).send('Invalid signup data');
    }
    let users = loadUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).send('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed, orders: [], cart: [] });
    saveUsers(users);
    req.session.user = { email };
    res.redirect('/index.html');

    // Send notification email to admin
    const mailOptions = {
        from: EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'New User Signup on Hardware & Equipment',
        text: `A new user has signed up:\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        // Ignore errors for UX
        res.redirect('/index.html');
    });
});

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Invalid login data');
    }
    let users = loadUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send('User not found. Please sign up first.');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).send('Incorrect password');
    }
    req.session.user = { email };
    // Send notification email to admin
    const mailOptions = {
        from: EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'New Login on UTU Hardware',
        text: `A user logged in with email: ${email}\nTime: ${new Date().toLocaleString()}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        // Ignore errors for UX
        res.redirect('/index.html');
    });
});

// LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login.html');
    });
});

// CART: Get current user's cart
app.get('/cart', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    let users = loadUsers();
    const user = users.find(u => u.email === req.session.user.email);
    res.json(user ? user.cart || [] : []);
});

// CART: Add item to cart
app.post('/cart/add', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    const { product } = req.body;
    if (!product) return res.status(400).send('No product specified');
    let users = loadUsers();
    const user = users.find(u => u.email === req.session.user.email);
    if (!user.cart) user.cart = [];
    user.cart.push(product);
    saveUsers(users);
    res.json({ success: true, cart: user.cart });
});

// CART: Remove item from cart (by product id or name)
app.post('/cart/remove', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    const { productId } = req.body;
    if (!productId) return res.status(400).send('No productId specified');
    let users = loadUsers();
    const user = users.find(u => u.email === req.session.user.email);
    if (!user.cart) user.cart = [];
    user.cart = user.cart.filter(p => p.id !== productId);
    saveUsers(users);
    res.json({ success: true, cart: user.cart });
});

// ORDER: Place order (move cart to orders)
app.post('/order', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    let users = loadUsers();
    const user = users.find(u => u.email === req.session.user.email);
    if (!user.cart || user.cart.length === 0) {
        return res.status(400).send('Cart is empty');
    }
    if (!user.orders) user.orders = [];
    user.orders.push({
        items: user.cart,
        date: new Date().toISOString(),
        id: Date.now()
    });
    user.cart = [];
    saveUsers(users);
    res.json({ success: true, orders: user.orders });
});

// ORDERS: Get order history
app.get('/orders', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    let users = loadUsers();
    const user = users.find(u => u.email === req.session.user.email);
    res.json(user ? user.orders || [] : []);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 