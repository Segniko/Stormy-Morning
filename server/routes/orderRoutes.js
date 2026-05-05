import express from 'express';
import {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    fixAddresses
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/fix-addresses').put(protect, admin, fixAddresses);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;
