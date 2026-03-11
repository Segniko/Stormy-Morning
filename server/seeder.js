import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('Data Imported! 🚀');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed! 🧨');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
