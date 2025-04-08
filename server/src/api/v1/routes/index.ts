import locationRoutes from "./location";
import { Express } from "express";

const router = (app: Express) => {
    const version = "/api/v1";
    app.use(version + "/locations", locationRoutes);
};

export default router;