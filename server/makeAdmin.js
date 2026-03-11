// Usage: node makeAdmin.js your@email.com
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.error('❌  Please provide an email: node makeAdmin.js your@email.com');
    process.exit(1);
}

const makeAdmin = async () => {
    await connectDB();
    const user = await User.findOneAndUpdate(
        { email },
        { role: 'admin' },
        { new: true }
    );

    if (user) {
        console.log(`✅  ${user.name} (${user.email}) is now an admin!`);
    } else {
        console.error(`❌  No user found with email: ${email}`);
    }

    process.exit();
};

makeAdmin();
