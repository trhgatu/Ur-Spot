import { Request, Response } from "express";
import axios from "axios";
import { Province } from "../types/province";
import { District } from "../types/district";

const BASE_URL = "https://provinces.open-api.vn/api";

const controller = {
    provinces: async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${BASE_URL}/p`);

            const provinces: Province[] = response.data.map((p: { code: string; name: string }) => ({
                code: p.code,
                name: p.name,
            }));
            res.json([{ code: "all", name: "Tất cả thành phố" }, ...provinces]);
        } catch (error) {
            console.error("Error fetching provinces:", error);
            res.status(500).json({ message: "Failed to fetch provinces" });
        }
    },

    districts: async (req: Request, res: Response): Promise<void> => {
        const { provinceCode } = req.params;
        try {
            if (provinceCode === "all") {
                res.json([{ code: "all", name: "Tất cả quận" }]);
                return;
            }
            const response = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
            const districts: District[] = response.data.districts.map((d: { code: string; name: string }) => ({
                code: d.code,
                name: d.name,
            }));
            res.status(200).json(districts);
        } catch (error) {
            console.error("Error fetching districts:", error);
            res.status(500).json({ message: "Failed to fetch districts" });
        }
    },
    wards: async (req: Request, res: Response): Promise<void> => {
        const { districtCode } = req.params;
        try {
            if (districtCode === "all") {
                res.json([{ code: "all", name: "Tất cả phường/xã" }]);
                return;
            }
            const response = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
            const wards = response.data.wards.map((w: { code: string; name: string }) => ({
                code: w.code,
                name: w.name,
            }));
            res.status(200).json(wards);
        } catch (error) {
            console.error("Error fetching wards:", error);
            res.status(500).json({ message: "Failed to fetch wards" });
        }
    },

};

export default controller;
