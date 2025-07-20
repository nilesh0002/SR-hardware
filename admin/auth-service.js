// Client-side Authentication Service
// This simulates backend authentication for demo purposes

class AuthService {
  constructor() {
    // Get stored password or use default
    const storedPassword = localStorage.getItem('adminPassword') || 'nilesh123';
    
    this.ADMIN_CREDENTIALS = {
      'nilesh.singh0032@gmail.com': {
        password: storedPassword,
        name: 'Nilesh Singh',
        role: 'super-admin',
        permissions: ['all']
      }
    };
    
    this.JWT_SECRET = 'shreeraam-hardware-admin-secret-key-2025';
    this.SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  }

  // Simple JWT-like token generation
  generateToken(email, userData) {
    const payload = {
      email: email,
      name: userData.name,
      role: userData.role,
      permissions: userData.permissions,
      iat: Date.now(),
      exp: Date.now() + this.SESSION_TIMEOUT
    };
    
    // Simple base64 encoding (in production, use proper JWT)
    return btoa(JSON.stringify(payload));
  }

  // Verify token
  verifyToken(token) {
    try {
      const payload = JSON.parse(atob(token));
      const now = Date.now();
      
      // Check if token is expired
      if (payload.exp < now) {
        return null;
      }
      
      return payload;
    } catch (error) {
      return null;
    }
  }

  // Login function
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.ADMIN_CREDENTIALS[email];
        
        if (!user || user.password !== password) {
          reject(new Error('Invalid email or password. Only authorized admin can access.'));
          return;
        }
        
        const token = this.generateToken(email, user);
        const userData = {
          email: email,
          name: user.name,
          role: user.role,
          permissions: user.permissions
        };
        
        resolve({
          token: token,
          user: userData,
          message: 'Login successful - Super Admin Access Granted'
        });
      }, 1000); // Simulate network delay
    });
  }

  // Verify authentication
  async verify(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const payload = this.verifyToken(token);
        
        if (!payload) {
          reject(new Error('Invalid or expired token'));
          return;
        }
        
        resolve({
          valid: true,
          user: {
            email: payload.email,
            name: payload.name,
            role: payload.role,
            permissions: payload.permissions
          }
        });
      }, 500);
    });
  }

  // Logout function
  logout() {
    // Clear any stored data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminUser');
    
    return Promise.resolve({ message: 'Logged out successfully' });
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
    
    const payload = this.verifyToken(token);
    return payload !== null;
  }

  // Get current user
  getCurrentUser() {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;
    
    const payload = this.verifyToken(token);
    return payload;
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return user.permissions.includes('all') || user.permissions.includes(permission);
  }

  // Check if user is super admin
  isSuperAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'super-admin';
  }

  // Update password persistently
  updatePassword(newPassword) {
    // Update in memory
    this.ADMIN_CREDENTIALS['nilesh.singh0032@gmail.com'].password = newPassword;
    // Store in localStorage for persistence
    localStorage.setItem('adminPassword', newPassword);
  }

  // Reset password to default
  resetPassword() {
    const defaultPassword = 'nilesh123';
    this.updatePassword(defaultPassword);
    return defaultPassword;
  }
}

// Create global instance
window.authService = new AuthService(); 