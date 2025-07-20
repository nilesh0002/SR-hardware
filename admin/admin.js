// DOM elements - only access if they exist (for admin.html page)
let dashboard, adminInfo, sidebarLinks, contentSection, logoutBtns;

// Initialize DOM elements when needed
function initializeDOMElements() {
  if (!dashboard) dashboard = document.getElementById('admin-dashboard');
  if (!adminInfo) adminInfo = document.getElementById('admin-info');
  if (!sidebarLinks) sidebarLinks = document.querySelectorAll('.admin-sidebar nav ul li[data-section]');
  if (!contentSection) contentSection = document.getElementById('admin-content');
  if (!logoutBtns) logoutBtns = [
    document.getElementById('admin-logout'),
    document.getElementById('admin-logout-top')
  ];
}

// Authentication functions
function getToken() {
  return localStorage.getItem('adminToken');
}

function clearToken() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminUser');
}

function isAuthenticated() {
  return window.authService && window.authService.isAuthenticated();
}

async function verifyAuthentication() {
  console.log('Verifying authentication...');
  
  if (!window.authService) {
    console.log('Auth service not available');
    redirectToLogin();
    return false;
  }

  const token = getToken();
  console.log('Token found:', !!token);
  
  if (!token) {
    console.log('No token found, redirecting to login');
    redirectToLogin();
    return false;
  }

  try {
    const result = await window.authService.verify(token);
    console.log('Authentication result:', result);
    return result.valid;
  } catch (error) {
    console.error('Authentication failed:', error);
    clearToken();
    redirectToLogin();
    return false;
  }
}

function redirectToLogin() {
  window.location.href = 'admin-login.html';
}

function showSection(section) {
  initializeDOMElements();
  if (!sidebarLinks || !contentSection) return;
  
  sidebarLinks.forEach(link => link.classList.remove('active'));
  const active = document.querySelector(`.admin-sidebar nav ul li[data-section="${section}"]`);
  if (active) active.classList.add('active');
  
  if (section === 'overview') {
    contentSection.innerHTML = `
      <h2>Dashboard Overview</h2>
      <div id="admin-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fa fa-users"></i>
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-box"></i>
            <h3>Total Products</h3>
            <p>50+</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-shopping-bag"></i>
            <h3>Total Orders</h3>
            <p>567</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-star"></i>
            <h3>Total Reviews</h3>
            <p>89</p>
          </div>
        </div>
      </div>
    `;
  } else if (section === 'products') {
    contentSection.innerHTML = `
      <h2>Product Management</h2>
      <div class="admin-form-container">
        <form id="product-form" class="admin-form">
          <div class="form-header">
            <h3><i class="fa fa-plus"></i> Add New Product</h3>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="product-name">Product Name *</label>
              <input type="text" id="product-name" name="name" required placeholder="Enter product name">
            </div>
            <div class="form-group">
              <label for="product-brand">Brand *</label>
              <input type="text" id="product-brand" name="brand" required placeholder="Enter brand name">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="product-category">Category *</label>
              <select id="product-category" name="category" required>
                <option value="">Select Category</option>
                <option value="cement">Cement</option>
                <option value="paints">Paints</option>
                <option value="tools">Tools & Equipment</option>
                <option value="doors">Doors & Windows</option>
                <option value="plumbing">Plumbing</option>
                <option value="wall-putty">Wall Putty</option>
              </select>
            </div>
            <div class="form-group">
              <label for="product-id">Product ID *</label>
              <input type="text" id="product-id" name="_id" required placeholder="e.g., cement-ultratech">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="product-price">Price (₹) *</label>
              <input type="number" id="product-price" name="price" required placeholder="Enter price" min="0">
            </div>
            <div class="form-group">
              <label for="product-original-price">Original Price (₹)</label>
              <input type="number" id="product-original-price" name="originalPrice" placeholder="Enter original price" min="0">
            </div>
          </div>
          
          <div class="form-group">
            <label for="product-image">Product Image URL</label>
            <input type="url" id="product-image" name="image" placeholder="Enter image URL">
          </div>
          
          <div class="form-group">
            <label for="product-description">Description</label>
            <textarea id="product-description" name="description" rows="3" placeholder="Enter product description"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fa fa-save"></i> Add Product
            </button>
            <button type="reset" class="btn-secondary">
              <i class="fa fa-refresh"></i> Reset Form
            </button>
          </div>
        </form>
        
        <div class="form-info">
          <h4><i class="fa fa-info-circle"></i> Form Guidelines</h4>
          <ul>
            <li>All fields marked with * are required</li>
            <li>Product ID should be unique (e.g., cement-ultratech)</li>
            <li>Price should be in Indian Rupees (₹)</li>
            <li>Image URL should be a valid web address</li>
            <li>Original price is optional (for discount calculation)</li>
          </ul>
        </div>
      </div>
    `;
    
    // Add form submission handler
    const productForm = document.getElementById('product-form');
    if (productForm) {
      productForm.addEventListener('submit', handleProductSubmit);
    }
  } else if (section === 'users') {
    // Get current admin user data
    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    contentSection.innerHTML = `
      <h2>User Management</h2>
      <div class="admin-content-container">
        <div class="user-stats">
          <div class="stat-card">
            <i class="fa fa-users"></i>
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-user-check"></i>
            <h3>Active Users</h3>
            <p>1,156</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-user-clock"></i>
            <h3>New This Month</h3>
            <p>89</p>
          </div>
          <div class="stat-card">
            <i class="fa fa-user-shield"></i>
            <h3>Admin Users</h3>
            <p>1</p>
          </div>
        </div>
        
        <div class="user-management-section">
          <div class="section-header">
            <h3><i class="fa fa-list"></i> All Registered Users</h3>
            <button class="btn-primary" onclick="refreshUserList()">
              <i class="fa fa-refresh"></i> Refresh
            </button>
          </div>
          
          <div class="user-filters">
            <input type="text" id="user-search" placeholder="Search users..." class="search-input">
            <select id="role-filter" class="filter-select">
              <option value="">All Roles</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            <select id="status-filter" class="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div class="user-table-container">
            <table class="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="user-table-body">
                <!-- User data will be populated here -->
              </tbody>
            </table>
          </div>
          
          <div class="user-pagination">
            <button class="btn-secondary" onclick="previousPage()">
              <i class="fa fa-chevron-left"></i> Previous
            </button>
            <span class="page-info">Page 1 of 25</span>
            <button class="btn-secondary" onclick="nextPage()">
              Next <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div class="user-actions-panel">
          <h3><i class="fa fa-cogs"></i> Bulk Operations</h3>
          <div class="bulk-actions">
            <button class="btn-secondary" onclick="bulkActivate()">
              <i class="fa fa-check"></i> Activate Selected
            </button>
            <button class="btn-secondary" onclick="bulkDeactivate()">
              <i class="fa fa-ban"></i> Deactivate Selected
            </button>
            <button class="btn-secondary" onclick="bulkDelete()">
              <i class="fa fa-trash"></i> Delete Selected
            </button>
            <button class="btn-primary" onclick="exportUsers()">
              <i class="fa fa-download"></i> Export Users
            </button>
          </div>
        </div>
        
        <div class="current-admin-info">
          <div class="info-card">
            <h3><i class="fa fa-user-shield"></i> Current Active Admin</h3>
            <div class="admin-details">
              <div class="admin-avatar">
                <i class="fa fa-user"></i>
              </div>
              <div class="admin-info">
                <h4>${currentUser.name || 'Nilesh Singh'}</h4>
                <p><strong>Email:</strong> ${currentUser.email || 'nilesh.singh0032@gmail.com'}</p>
                <p><strong>Role:</strong> ${currentUser.role || 'super-admin'}</p>
                <p><strong>Permissions:</strong> All Access</p>
                <p><strong>Login Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
            <div class="admin-actions">
              <button class="btn-primary" onclick="viewAdminProfile()">
                <i class="fa fa-eye"></i> View Profile
              </button>
              <button class="btn-secondary" onclick="editAdminProfile()">
                <i class="fa fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Load user data
    loadUserData();
  } else if (section === 'orders') {
    contentSection.innerHTML = `
      <h2>Order Management</h2>
      <div class="admin-form-container">
        <form id="order-form" class="admin-form">
          <div class="form-header">
            <h3><i class="fa fa-shopping-cart"></i> Create New Order</h3>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="order-customer">Customer Name *</label>
              <input type="text" id="order-customer" name="customerName" required placeholder="Enter customer name">
            </div>
            <div class="form-group">
              <label for="order-phone">Customer Phone *</label>
              <input type="tel" id="order-phone" name="customerPhone" required placeholder="Enter phone number" pattern="[0-9]{10}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="order-product">Product *</label>
              <select id="order-product" name="productId" required>
                <option value="">Select Product</option>
                <option value="cement-ultratech">UltraTech Cement</option>
                <option value="paint-asian-paints">Asian Paints</option>
                <option value="tools-bosch">Bosch Drill Machine</option>
                <option value="door-wooden">Classic Wooden Door</option>
                <option value="pipe-pvc">PVC Pipes Set</option>
                <option value="putty-asian">Asian Paints Putty</option>
              </select>
            </div>
            <div class="form-group">
              <label for="order-quantity">Quantity *</label>
              <input type="number" id="order-quantity" name="quantity" required placeholder="Enter quantity" min="1">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="order-status">Order Status *</label>
              <select id="order-status" name="status" required>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="form-group">
              <label for="order-payment">Payment Status *</label>
              <select id="order-payment" name="paymentStatus" required>
                <option value="">Select Payment Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="order-address">Delivery Address</label>
            <textarea id="order-address" name="deliveryAddress" rows="3" placeholder="Enter delivery address"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fa fa-save"></i> Create Order
            </button>
            <button type="reset" class="btn-secondary">
              <i class="fa fa-refresh"></i> Reset Form
            </button>
          </div>
        </form>
        
        <div class="form-info">
          <h4><i class="fa fa-info-circle"></i> Order Management Guidelines</h4>
          <ul>
            <li>All fields marked with * are required</li>
            <li>Customer phone must be 10 digits</li>
            <li>Quantity must be at least 1</li>
            <li>Select appropriate order and payment status</li>
            <li>Delivery address is optional for pickup orders</li>
          </ul>
        </div>
      </div>
    `;
    
    // Add form submission handler
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.addEventListener('submit', handleOrderSubmit);
    }
  } else if (section === 'settings') {
    // Get current admin user data
    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    contentSection.innerHTML = `
      <h2>Admin Settings</h2>
      <div class="admin-content-container">
        <div class="settings-grid">
          <div class="settings-card">
            <div class="settings-header">
              <h3><i class="fa fa-lock"></i> Change Password</h3>
              <p>Update your admin account password</p>
            </div>
            <form id="change-password-form" class="admin-form">
              <div class="form-group">
                <label for="current-password">Current Password *</label>
                <input type="password" id="current-password" name="currentPassword" required placeholder="Enter current password">
              </div>
              
              <div class="form-group">
                <label for="new-password">New Password *</label>
                <input type="password" id="new-password" name="newPassword" required placeholder="Enter new password" minlength="6">
                <small class="form-help">Password must be at least 6 characters long</small>
              </div>
              
              <div class="form-group">
                <label for="confirm-password">Confirm New Password *</label>
                <input type="password" id="confirm-password" name="confirmPassword" required placeholder="Confirm new password">
              </div>
              
                        <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fa fa-key"></i> Change Password
            </button>
            <button type="reset" class="btn-secondary">
              <i class="fa fa-refresh"></i> Reset Form
            </button>
            <button type="button" class="btn-secondary" onclick="resetToDefaultPassword()">
              <i class="fa fa-undo"></i> Reset to Default
            </button>
            <button type="button" class="btn-secondary" onclick="showCurrentPassword()">
              <i class="fa fa-eye"></i> Show Current Password
            </button>
          </div>
            </form>
          </div>
          
          <div class="settings-card">
            <div class="settings-header">
              <h3><i class="fa fa-user-shield"></i> Account Information</h3>
              <p>Your current admin account details</p>
            </div>
            <div class="account-info">
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${currentUser.name || 'Nilesh Singh'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${currentUser.email || 'nilesh.singh0032@gmail.com'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Role:</span>
                <span class="info-value"><span class="role-badge super-admin">${currentUser.role || 'super-admin'}</span></span>
              </div>
              <div class="info-row">
                <span class="info-label">Permissions:</span>
                <span class="info-value">Full Access (All Features)</span>
              </div>
              <div class="info-row">
                <span class="info-label">Last Login:</span>
                <span class="info-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div class="settings-card">
            <div class="settings-header">
              <h3><i class="fa fa-shield-alt"></i> Security Settings</h3>
              <p>Manage your account security preferences</p>
            </div>
            <div class="security-settings">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Session Timeout</h4>
                  <p>Automatically logout after 30 minutes of inactivity</p>
                </div>
                <div class="setting-control">
                  <span class="status-badge active">Enabled</span>
                </div>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <div class="setting-control">
                  <button class="btn-secondary" onclick="enable2FA()">
                    <i class="fa fa-plus"></i> Enable 2FA
                  </button>
                </div>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Login Notifications</h4>
                  <p>Get notified of new login attempts</p>
                </div>
                <div class="setting-control">
                  <button class="btn-secondary" onclick="toggleNotifications()">
                    <i class="fa fa-bell"></i> Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add form submission handler for password change
    const passwordForm = document.getElementById('change-password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordChange);
    }
  } else {
    contentSection.innerHTML = `
      <h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
      <div class="coming-soon">
        <i class="fa fa-tools"></i>
        <p>This section is under development. Coming soon!</p>
      </div>
    `;
  }
}

function handleProductSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const productData = {
    _id: formData.get('_id'),
    name: formData.get('name'),
    brand: formData.get('brand'),
    category: formData.get('category'),
    price: parseFloat(formData.get('price')),
    originalPrice: formData.get('originalPrice') ? parseFloat(formData.get('originalPrice')) : null,
    images: formData.get('image') ? [formData.get('image')] : ['images/placeholder.png'],
    description: formData.get('description') || ''
  };
  
  // Show success message
  showNotification('Product added successfully!', 'success');
  
  // Reset form
  e.target.reset();
  
  console.log('Product Data:', productData);
}



function handleOrderSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const orderData = {
    customerName: formData.get('customerName'),
    customerPhone: formData.get('customerPhone'),
    productId: formData.get('productId'),
    quantity: parseInt(formData.get('quantity')),
    status: formData.get('status'),
    paymentStatus: formData.get('paymentStatus'),
    deliveryAddress: formData.get('deliveryAddress') || '',
    orderDate: new Date().toISOString()
  };
  
  // Show success message
  showNotification('Order created successfully!', 'success');
  
  // Reset form
  e.target.reset();
  
  console.log('Order Data:', orderData);
}

function handlePasswordChange(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');
  
  // Validation
  if (newPassword.length < 6) {
    showNotification('New password must be at least 6 characters long', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showNotification('New passwords do not match', 'error');
    return;
  }
  
  // Check current password (simulate backend validation)
  const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const expectedPassword = 'nilesh123'; // This would come from backend in real app
  
  if (currentPassword !== expectedPassword) {
    showNotification('Current password is incorrect', 'error');
    return;
  }
  
  // Update password (in real app, this would be sent to backend)
  if (window.authService) {
    // Update the stored credentials persistently
    window.authService.updatePassword(newPassword);
  }
  
  // Show success message
  showNotification('Password changed successfully! Please login again with your new password.', 'success');
  
  // Reset form
  e.target.reset();
  
  // Logout user after password change (security best practice)
  setTimeout(() => {
    if (window.authService) {
      window.authService.logout();
    }
    clearToken();
    redirectToLogin();
  }, 2000);
  
  console.log('Password changed successfully');
}

function enable2FA() {
  showNotification('Two-factor authentication setup will be available soon!', 'info');
}

function toggleNotifications() {
  showNotification('Login notifications will be available soon!', 'info');
}

function resetToDefaultPassword() {
  if (confirm('Are you sure you want to reset the password to the default? This will change it back to "nilesh123".')) {
    if (window.authService) {
      const defaultPassword = window.authService.resetPassword();
      showNotification(`Password reset to default: ${defaultPassword}`, 'success');
    }
  }
}

function showCurrentPassword() {
  if (window.authService) {
    const currentPassword = window.authService.ADMIN_CREDENTIALS['nilesh.singh0032@gmail.com'].password;
    showNotification(`Current password is: ${currentPassword}`, 'info');
  }
}

// User Management Functions
function loadUserData() {
  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Nilesh Singh',
      email: 'nilesh.singh0032@gmail.com',
      role: 'super-admin',
      status: 'active',
      lastActive: '2025-01-15 14:30:00'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@example.com',
      role: 'customer',
      status: 'active',
      lastActive: '2025-01-15 13:45:00'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'customer',
      status: 'active',
      lastActive: '2025-01-15 12:20:00'
    },
    {
      id: 4,
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      role: 'customer',
      status: 'inactive',
      lastActive: '2025-01-10 09:15:00'
    },
    {
      id: 5,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@example.com',
      role: 'customer',
      status: 'active',
      lastActive: '2025-01-15 11:30:00'
    }
  ];

  const tableBody = document.getElementById('user-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = users.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td><span class="role-badge ${user.role}">${user.role}</span></td>
      <td><span class="status-badge ${user.status}">${user.status}</span></td>
      <td>${user.lastActive}</td>
      <td>
        <button class="action-btn" onclick="viewUser(${user.id})" title="View">
          <i class="fa fa-eye"></i>
        </button>
        <button class="action-btn" onclick="editUser(${user.id})" title="Edit">
          <i class="fa fa-edit"></i>
        </button>
        <button class="action-btn" onclick="deleteUser(${user.id})" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function refreshUserList() {
  showNotification('User list refreshed successfully!', 'success');
  loadUserData();
}

function previousPage() {
  showNotification('Previous page loaded', 'info');
}

function nextPage() {
  showNotification('Next page loaded', 'info');
}

function bulkActivate() {
  showNotification('Selected users activated successfully!', 'success');
}

function bulkDeactivate() {
  showNotification('Selected users deactivated successfully!', 'success');
}

function bulkDelete() {
  if (confirm('Are you sure you want to delete selected users? This action cannot be undone.')) {
    showNotification('Selected users deleted successfully!', 'success');
  }
}

function exportUsers() {
  showNotification('User data exported successfully!', 'success');
}

function viewUser(userId) {
  showNotification(`Viewing user ID: ${userId}`, 'info');
}

function editUser(userId) {
  showNotification(`Editing user ID: ${userId}`, 'info');
}

function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    showNotification(`User ID: ${userId} deleted successfully!`, 'success');
  }
}

function viewAdminProfile() {
  showNotification('Admin profile view opened', 'info');
}

function editAdminProfile() {
  showNotification('Admin profile edit mode activated', 'info');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `admin-notification ${type}`;
  
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'exclamation-circle';
  
  notification.innerHTML = `
    <i class="fa fa-${icon}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Sidebar navigation
function setupSidebarNavigation() {
  initializeDOMElements();
  if (!sidebarLinks) return;
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      if (section) showSection(section);
    });
  });
}

// Logout - clear token and redirect to login
function setupLogoutButtons() {
  initializeDOMElements();
  if (!logoutBtns) return;
  
  logoutBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', async function() {
      if (window.authService) {
        await window.authService.logout();
      }
      clearToken();
      redirectToLogin();
    });
  });
}

// On page load, check authentication and show dashboard
window.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM Content Loaded - Starting admin initialization');
  
  // Check if user is authenticated
  const isAuth = await verifyAuthentication();
  console.log('Authentication result:', isAuth);
  
  if (!isAuth) {
    console.log('Authentication failed, returning');
    return; // Already redirected to login
  }
  
  console.log('Authentication successful, setting up admin interface');
  
  // Initialize DOM elements and setup event listeners
  initializeDOMElements();
  setupSidebarNavigation();
  setupLogoutButtons();
  
  // Show admin info
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  console.log('Admin user data:', adminUser);
  
  if (adminInfo) {
    const roleBadge = adminUser.role === 'super-admin' ? ' (Super Admin)' : '';
    adminInfo.innerHTML = `
      <span>Logged in as: ${adminUser.name || adminUser.email || 'Admin'}${roleBadge}</span>
      <div class="admin-status">
        <i class="fa fa-shield-alt"></i>
        <span>Full Access Granted</span>
      </div>
    `;
  }
  
  console.log('Showing dashboard overview');
  // Show dashboard
  showSection('overview');
}); 

// Add security features
document.addEventListener('keydown', function(e) {
  // Prevent F12, Ctrl+Shift+I, Ctrl+U (common dev tools shortcuts)
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
    return false;
  }
});

// Prevent right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Auto-logout after inactivity (30 minutes)
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showNotification('Session expired due to inactivity. Please login again.', 'error');
    clearToken();
    redirectToLogin();
  }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Initialize timer
resetInactivityTimer();

// Simple session management - only logout on actual logout button click
// Removed aggressive refresh detection to allow normal page usage 