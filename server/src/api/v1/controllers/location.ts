import { Request, Response } from "express";
import Location from "../models/location";

const controller = {
    /* [GET] api/v1/locations */
    index: async (req: Request, res: Response) => {
        try {
            const locations = await Location.find();
            res.status(200).json({
                success: true,
                data: locations
            });
        } catch (error) {
            console.error("Error fetching locations:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching locations"
            });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const { name, description, address, categoryId } = req.body;
            const location = await Location.create({ name, description, address, categoryId });
            res.status(201).json({ success: true, data: location });
        } catch (error) {
            console.error("Error creating location:", error);
            res.status(500).json({
                success: false,
                message: "Server error while creating location"
            });
        }
    }
};

export default controller;
