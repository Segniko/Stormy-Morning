import express from 'express';
import {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    requestPasswordReset,
    getResetRequests,
    adminResetPassword
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', requestPasswordReset);
router.get('/profile', protect, getUserProfile);
router.get('/reset-requests', protect, admin, getResetRequests);
router.put('/reset-password/:id', protect, admin, adminResetPassword);

export default router;
