import Order from '../models/orderModel.js';

// Create new order
// POST /api/orders
// @access Private
const addOrderItems = async (req, res, next) => {
    try {
        const {
            items,
            shippingAddress,
            totalAmount,
        } = req.body;

        if (items && items.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                items: items.map((x) => ({
                    ...x,
                    product: x._id,
                    _id: undefined,
                })),
                user: req.user._id,
                shippingAddress,
                totalAmount,
            });

            const createdOrder = await order.save();

            // Mock Payment Simulation
            setTimeout(async () => {
                createdOrder.paymentStatus = 'Paid';
                await createdOrder.save();
            }, 2000);

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        next(error);
    }
};

// Get logged in user orders
// GET /api/orders/mine
// @access Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Get order by ID
// GET /api/orders/:id
// @access Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name images');

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// Get all orders
// GET /api/orders
// @access Private/Admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name')
            .populate('items.product', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Update order status
// PUT /api/orders/:id/status
// @access Private/Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.orderStatus = req.body.status || order.orderStatus;

            // Add to tracking history
            order.trackingHistory.push({
                status: order.orderStatus,
                timestamp: new Date()
            });

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus
};

