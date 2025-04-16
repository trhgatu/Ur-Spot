"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Kết nối thành công");
    }
    catch (error) {
        console.error("Kết nối thất bại:", error);
    }
};
exports.connectDatabase = connectDatabase;
