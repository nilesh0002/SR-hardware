// Admin Authentication Configuration
// This file contains admin credentials and authentication settings

const ADMIN_CREDENTIALS = {
  'nilesh.singh0032@gmail.com': {
    password: 'nilesh123',
    name: 'Nilesh Singh',
    role: 'super-admin',
    permissions: ['all']
  }
};

// JWT Secret (in production, this should be in environment variables)
const JWT_SECRET = 'shreeraam-hardware-admin-secret-key-2025';

// Session timeout (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ADMIN_CREDENTIALS,
    JWT_SECRET,
    SESSION_TIMEOUT
  };
} 