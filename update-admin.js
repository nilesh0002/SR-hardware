const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shree-raam-hardware', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import User model
const User = require('./models/User');

async function updateUserToAdmin() {
    try {
        // Find the user by email
        const user = await User.findOne({ email: 'nilesh.singh0032@gmail.com' });
        
        if (!user) {
            console.log('❌ User not found');
            return;
        }

        // Update user role to admin
        user.role = 'admin';
        await user.save();

        console.log('✅ User updated to admin successfully!');
        console.log('User details:', {
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error('❌ Error updating user:', error);
    } finally {
        mongoose.connection.close();
    }
}

updateUserToAdmin(); 