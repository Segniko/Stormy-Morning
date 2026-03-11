import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String,
            required: true,
            enum: ['Apparel', 'Laptops', 'Audio', 'Wearables', 'Bags', 'Photography', 'Fashion', 'Gadget'],
        },
        type: {
            type: String,
            required: true,
            enum: ['Fashion', 'Gadget'],
        },
        images: [String],
        videoUrl: {
            type: String,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        brand: {
            type: String,
        },
        // Polymorphic Metadata
        fashionDetails: {
            sizes: [String],
            materials: [String],
            washCare: String,
        },
        gadgetDetails: {
            specs: {
                type: Map,
                of: String,
            },
            warranty: String,
            inBox: [String],
        },
        // Cross-sell
        relatedItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
