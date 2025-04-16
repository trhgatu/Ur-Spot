import { Request, Response } from "express";
import Location from "../models/location";
import Category from "../models/category";

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
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name,
                description,
                address,
                categoryId,
                administrativeUnit,
                coordinates,
                images,
                createdBy, } = req.body;
            if (!name || !address || !categoryId || !administrativeUnit) {
                res.status(400).json({
                    success: false,
                    message: "Name, address, categoryId, and administrativeUnit are required",
                });
            }
            if (
                !administrativeUnit.provinceId ||
                !administrativeUnit.provinceName ||
                !administrativeUnit.districtId ||
                !administrativeUnit.districtName
            ) {
                res.status(400).json({
                    success: false,
                    message: "Province and district information is required",
                });
            }
            const category = await Category.findById(categoryId);
            if (!category) {
                res.status(400).json({
                    success: false,
                    message: "Invalid categoryId",
                });
            }
            const locationData = {
                name,
                description: description || "",
                address,
                categoryId,
                administrativeUnit: {
                    provinceId: administrativeUnit.provinceId,
                    provinceName: administrativeUnit.provinceName,
                    districtId: administrativeUnit.districtId,
                    districtName: administrativeUnit.districtName,
                    wardId: administrativeUnit.wardId || "",
                    wardName: administrativeUnit.wardName || "",
                },
                coordinates: coordinates || { type: "Point", coordinates: [0, 0] },
                images: images || [],
                createdBy,
                averageRating: 0,
                ratings: [],
            };
            const location = await Location.create(locationData);
            res.status(201).json({ success: true, data: location });
        } catch (error) {
            console.error("Error creating location:", error);
            res.status(500).json({
                success: false,
                message: "Server error while creating location"
            });
        }
    },
    getLocationById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const location = await Location.findById(id);
            res.status(200).json({ success: true, data: location });
        } catch (error) {
            console.error("Error fetching location by ID:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching location by ID"
            });
        }
    }
};

export default controller;
