import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Register user
// POST /api/users
// @access Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// Auth user & get token
// POST /api/users/login
// @access Public
const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// Logout user / clear cookie
// POST /api/users/logout
// @access Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Get user profile
// GET /api/users/profile
// @access Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// Request password reset
// POST /api/users/forgot-password
// @access Public
const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            await User.updateOne({ _id: user._id }, { resetRequest: true });
            res.status(200).json({ message: 'Password reset request submitted to admin.' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// Get all password reset requests
// GET /api/users/reset-requests
// @access Private/Admin
const getResetRequests = async (req, res, next) => {
    try {
        const users = await User.find({ resetRequest: true }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Admin reset user password
// PUT /api/users/reset-password/:id
// @access Private/Admin
const adminResetPassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // Salt and hash happen in pre-save middleware
            user.password = req.body.password || 'Stormy123!';
            user.resetRequest = false;
            await user.save();
            res.status(200).json({ message: 'Password reset successfully.' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// Get all users
// GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Update user role
// PUT /api/users/:id/role
// @access Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.params.id);
        
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userToUpdate.email === 'user1234@gmail.com' && req.body.role !== 'admin') {
            return res.status(403).json({ message: 'Cannot demote the superadmin.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    requestPasswordReset,
    getResetRequests,
    adminResetPassword,
    getAllUsers,
    updateUserRole
};

