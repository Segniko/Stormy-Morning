// Used for making an email address an admin so they get privileged access 
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.error('Please provide an email');
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
        console.log(`${user.name} (${user.email}) is now an admin!`);
    } else {
        console.error(`No user found with email: ${email}`);
    }

    process.exit();
};

makeAdmin();
