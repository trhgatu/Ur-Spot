"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = __importDefault(require("../models/location"));
const controller = {
    /* [GET] api/v1/locations */
    index: async (req, res) => {
        try {
            const locations = await location_1.default.find();
            res.status(200).json({
                success: true,
                data: locations
            });
        }
        catch (error) {
            console.error("Error fetching locations:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching locations"
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, description, address, categoryId } = req.body;
            const location = await location_1.default.create({ name, description, address, categoryId });
            res.status(201).json({ success: true, data: location });
        }
        catch (error) {
            console.error("Error creating location:", error);
            res.status(500).json({
                success: false,
                message: "Server error while creating location"
            });
        }
    }
};
exports.default = controller;
