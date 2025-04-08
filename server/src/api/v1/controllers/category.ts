import { Request, Response } from "express";
import Category from "../models/category";

const controller = {
    /* [GET] api/v1/categories */
    index: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find();
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching categories"
            });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const category = await Category.create({ name, description });
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({
                success: false,
                message: "Server error while creating category"
            });
        }
    },
};

export default controller;
