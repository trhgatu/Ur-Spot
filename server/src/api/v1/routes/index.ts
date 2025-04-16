import { Express } from "express";
import locationRoutes from "./location";
import categoryRoutes from "./category";
import administrativeUnitsRoutes from "./administrativeUnits";
const router = (app: Express) => {
    const version = "/api/v1";
    app.use(version + "/locations", locationRoutes);
    app.use(version + "/categories", categoryRoutes);
    app.use(version + "/administrative-units", administrativeUnitsRoutes);
};

export default router;