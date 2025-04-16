"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    avarageRating: {
        type: String
    }
});
const Location = mongoose_1.default.model('Location', locationSchema, 'locations');
exports.default = Location;
