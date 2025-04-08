import { Express } from "express";
import locationRoutes from "./location";
import categoryRoutes from "./category";
const router = (app: Express) => {
    const version = "/api/v1";
    app.use(version + "/locations", locationRoutes);
    app.use(version + "/categories", categoryRoutes);
};

export default router;