"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../models/category"));
const controller = {
    /* [GET] api/v1/categories */
    index: async (req, res) => {
        try {
            const categories = await category_1.default.find();
            res.status(200).json({
                success: true,
                data: categories
            });
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching categories"
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, description } = req.body;
            const category = await category_1.default.create({ name, description });
            res.status(201).json({ success: true, data: category });
        }
        catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({
                success: false,
                message: "Server error while creating category"
            });
        }
    },
};
exports.default = controller;
