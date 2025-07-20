# Admin Panel - Shree Raam Hardware

## 🔐 Authentication & Security

The admin panel is now **restricted** and requires proper authentication to access. Only **one super admin** has access to the system.

### 📋 Login Credentials

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `nilesh.singh0032@gmail.com` | `nilesh123` | Super Admin | Nilesh Singh | **ALL PERMISSIONS** |

### 🛡️ Security Features

1. **Single Admin Access**: Only one authorized super admin can access the system
2. **Full Permissions**: Super admin has complete control over all features
3. **Session Management**: Auto-logout after 30 minutes of inactivity
4. **Token Validation**: Secure token-based authentication
5. **Access Control**: Super admin role with all permissions
6. **Security Measures**: 
   - Prevents F12, Ctrl+Shift+I, Ctrl+U (dev tools)
   - Disables right-click context menu
   - Token expiration handling
   - Restricted access to authorized personnel only

### 🔄 How to Access

1. **Navigate** to the admin panel via the "Admin" button on the main site
2. **Enter** the super admin credentials above
3. **Click** "Login" to access the dashboard
4. **Use** the sidebar to navigate between sections

### 📱 Available Sections

- **Dashboard Overview**: Statistics and overview
- **Products**: Add and manage products
- **Users**: View user statistics and management info
- **Orders**: Create and manage orders
- **Reviews**: Manage customer reviews

### ⚠️ Important Notes

- **Single Admin**: Only Nilesh Singh has access to the admin panel
- **Full Control**: Super admin has complete permissions over all features
- **Session Timeout**: 30 minutes of inactivity will log you out
- **Secure Logout**: Always use the logout button to properly end sessions
- **Token Storage**: Authentication tokens are stored securely in localStorage
- **Demo Mode**: This is a client-side demo - in production, use proper backend authentication

### 🚀 Quick Start

1. Open `admin-login.html`
2. Use the super admin credentials above
3. Access the full admin dashboard with complete permissions
4. Manage products, users, and orders

### 🔧 Technical Details

- **Authentication Service**: `auth-service.js`
- **Main Admin Logic**: `admin.js`
- **Styling**: `admin.css`
- **Configuration**: `auth-config.js`
- **Super Admin Role**: Full permissions with role-based access control

### 🔒 Security Notice

- **Restricted Access**: Only authorized personnel (Nilesh Singh) can access
- **No Multiple Admins**: Single admin setup for enhanced security
- **Full Permissions**: Super admin has complete control over the system
- **Production Ready**: In production, implement proper backend authentication with secure password hashing and database storage

---

**⚠️ Security Notice**: This is a single-admin system for demo purposes. Only Nilesh Singh has access to the admin panel with full permissions. 