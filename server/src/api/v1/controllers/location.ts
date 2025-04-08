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
};

export default controller;
