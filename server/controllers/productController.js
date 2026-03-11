import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const category = req.query.category;
        const filter = category ? { category } : {};

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product (Dual-Spec)
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const {
            name, price, description, image, brand, category, countInStock,
            fashionDetails, gadgetDetails
        } = req.body;

        const product = new Product({
            name,
            price,
            user: req.user._id,
            image: '/images/sample.jpg', // Placeholder
            brand,
            category,
            countInStock,
            description,
            fashionDetails,
            gadgetDetails
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

export {
    createProduct, getProductById, getProducts
};

