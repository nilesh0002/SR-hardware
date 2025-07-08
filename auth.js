// Authentication Management System
class AuthManager {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = localStorage.getItem('authToken');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.init();
    }

    init() {
        this.updateAuthUI();
        this.setupEventListeners();
    }

    // Login function
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateAuthUI();
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: data.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Register function
    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateAuthUI();
                return { success: true, message: 'Registration successful!' };
            } else {
                return { success: false, message: data.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Logout function
    async logout() {
        try {
            if (this.token) {
                // Call logout endpoint
                await fetch(`${this.baseURL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Clear local storage and state regardless of API call success
            this.token = null;
            this.user = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            this.updateAuthUI();
            
            // Redirect to home page
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = 'index.html';
            }
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        return !!this.token && !!this.user;
    }

    // Check if user is admin
    isAdmin() {
        return this.isLoggedIn() && this.user.role === 'admin';
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Get auth token
    getToken() {
        return this.token;
    }

    // Update UI based on authentication state
    updateAuthUI() {
        const isLoggedIn = this.isLoggedIn();
        const user = this.getCurrentUser();

        // Update navigation items
        this.updateNavItems(isLoggedIn, user);

        // Update account page if on account page
        if (window.location.pathname.includes('account.html')) {
            this.updateAccountPage(user);
        }

        // Update login/register forms if on login page
        if (window.location.pathname.includes('login.html')) {
            this.updateLoginPage(isLoggedIn);
        }
    }

    // Update navigation items
    updateNavItems(isLoggedIn, user) {
        const navAuthItem = document.getElementById('nav-auth-item');
        if (!navAuthItem) return;
        if (isLoggedIn && user) {
            const avatar = user.name ? user.name.charAt(0).toUpperCase() : '?';
            const userCard = `
                <div class="dropdown-user-card">
                    <div class="dropdown-avatar">${avatar}</div>
                    <div>
                        <div class="dropdown-name">${user.name}</div>
                        <div class="dropdown-email">${user.email}</div>
                        <div class="dropdown-role">${user.role === 'admin' ? 'Admin' : 'User'}</div>
                    </div>
                </div>
            `;
            let dropdownHtml = '';
            if (user.role === 'admin') {
                dropdownHtml = `
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link account-toggle">
                            <i class="fa fa-user"></i>
                            <span>${user.name} (Admin)</span>
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            ${userCard}
                            <a href="admin.html" class="dropdown-item"><i class="fa fa-cog"></i> Admin Panel</a>
                            <a href="manage-products.html" class="dropdown-item"><i class="fa fa-box"></i> Manage Products</a>
                            <a href="manage-orders.html" class="dropdown-item"><i class="fa fa-list"></i> Manage Orders</a>
                            <a href="manage-users.html" class="dropdown-item"><i class="fa fa-users"></i> Manage Users</a>
                            <a href="#" class="dropdown-item logout-link"><i class="fa fa-sign-out-alt"></i> Logout</a>
                        </div>
                    </div>
                `;
            } else {
                dropdownHtml = `
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link account-toggle">
                            <i class="fa fa-user"></i>
                            <span>${user.name}</span>
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            ${userCard}
                            <a href="account.html" class="dropdown-item"><i class="fa fa-user-circle"></i> My Account</a>
                            <a href="account.html#orders" class="dropdown-item"><i class="fa fa-box"></i> My Orders</a>
                            <a href="#" class="dropdown-item logout-link"><i class="fa fa-sign-out-alt"></i> Logout</a>
                        </div>
                    </div>
                `;
            }
            navAuthItem.innerHTML = dropdownHtml;
            // Toggle dropdown on click (for both admin and user)
            const navItem = navAuthItem.querySelector('.nav-item.dropdown');
            const toggle = navAuthItem.querySelector('.account-toggle');
            const menu = navAuthItem.querySelector('.dropdown-menu');
            if (toggle && menu) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close all other dropdowns first
                    document.querySelectorAll('.dropdown-menu').forEach(m => { if (m !== menu) m.style.display = 'none'; });
                    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
                });
                // Close dropdown on outside click
                document.addEventListener('click', function(event) {
                    if (!navItem.contains(event.target)) {
                        menu.style.display = 'none';
                    }
                });
            }
        } else {
            navAuthItem.innerHTML = `
                <a href="login.html" class="nav-item">
                    <i class="fa fa-user"></i>
                    <span>Login</span>
                </a>
            `;
        }
        // Add logout functionality to logout links
        document.querySelectorAll('.logout-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });
    }

    // Update account page
    updateAccountPage(user) {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        // If admin, redirect to admin panel
        if (user.role === 'admin' && !window.location.pathname.includes('admin.html')) {
            window.location.href = 'admin.html';
            return;
        }
        // For users, update user info as before
        const accountName = document.querySelector('.account-name');
        const accountEmail = document.querySelector('.account-email');
        const accountAvatar = document.querySelector('.account-avatar');
        if (accountName) accountName.textContent = user.name;
        if (accountEmail) accountEmail.textContent = user.email;
        if (accountAvatar) {
            accountAvatar.textContent = user.name.charAt(0).toUpperCase();
        }
        this.addLogoutButtonToAccount();
    }

    // Add logout button to account page
    addLogoutButtonToAccount() {
        // Check if logout button already exists
        if (document.querySelector('.logout-button')) return;

        const accountHeader = document.querySelector('.account-header');
        if (accountHeader) {
            const logoutButton = document.createElement('button');
            logoutButton.className = 'logout-button';
            logoutButton.innerHTML = '<i class="fa fa-sign-out-alt"></i> Logout';
            logoutButton.style.cssText = `
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 0.5rem;
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
                cursor: pointer;
                transition: background 0.2s;
                margin-left: auto;
            `;

            logoutButton.addEventListener('click', () => {
                this.logout();
            });

            accountHeader.appendChild(logoutButton);
        }
    }

    // Update login page
    updateLoginPage(isLoggedIn) {
        if (isLoggedIn) {
            // Redirect to home page if already logged in
            window.location.href = 'index.html';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Handle login form submission
        const loginForm = document.querySelector('.fk-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = loginForm.querySelector('input[type="email"]').value;
                const password = loginForm.querySelector('input[type="password"]').value;

                const result = await this.login(email, password);
                this.showNotification(result.message, result.success ? 'success' : 'error');

                if (result.success) {
                    console.log('Login successful, redirecting to index.html...');
                    setTimeout(() => {
                        console.log('Redirecting now...');
                        window.location.href = 'index.html';
                    }, 1000);
                }
            });
        }

        // Handle register form submission
        const registerForm = document.querySelector('.fk-register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(registerForm);
                const userData = {
                    name: formData.get('name') || registerForm.querySelector('input[name="name"]').value,
                    email: formData.get('email') || registerForm.querySelector('input[type="email"]').value,
                    password: formData.get('password') || registerForm.querySelector('input[type="password"]').value,
                    phone: formData.get('phone') || registerForm.querySelector('input[name="phone"]').value
                };

                const result = await this.register(userData);
                this.showNotification(result.message, result.success ? 'success' : 'error');

                if (result.success) {
                    console.log('Registration successful, redirecting to index.html...');
                    setTimeout(() => {
                        console.log('Redirecting now...');
                        window.location.href = 'index.html';
                    }, 1000);
                }
            });
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#28a745';
                break;
            case 'error':
                notification.style.background = '#dc3545';
                break;
            default:
                notification.style.background = '#17a2b8';
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize authentication manager
const auth = new AuthManager();

// Add CSS for notifications and dropdown
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        right: 0;
        top: 100%;
        background: white;
        min-width: 200px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 0.5rem;
        z-index: 1000;
        margin-top: 0.5rem;
    }

    .dropdown:hover .dropdown-menu {
        display: block;
    }

    .dropdown-item {
        display: block;
        padding: 0.75rem 1rem;
        color: #333;
        text-decoration: none;
        transition: background 0.2s;
    }

    .dropdown-item:hover {
        background: #f8f9fa;
        text-decoration: none;
    }

    .dropdown-item i {
        margin-right: 0.5rem;
        width: 16px;
    }

    .logout-button:hover {
        background: #c82333 !important;
    }
`;
document.head.appendChild(style);

// Example usage: Fetch all users as admin
fetch('http://localhost:3000/api/admin/users', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
})
.then(res => res.json())
.then(users => console.table(users)); 