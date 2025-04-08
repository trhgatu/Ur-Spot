import mongoose from 'mongoose';

const connectDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Kết nối thành công");
    } catch(error) {
        console.error("Kết nối thất bại:", error);
    }
};

export { connectDatabase }