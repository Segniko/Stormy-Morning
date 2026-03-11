import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: { type: Number, required: true },
                priceAtPurchase: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending',
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
            default: 'Processing',
        },
        trackingHistory: [
            {
                status: { type: String },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
