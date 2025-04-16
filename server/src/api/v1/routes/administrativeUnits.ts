import express from "express";
import controller from "../controllers/administrativeUnits";

const router = express.Router();

router.get("/provinces", controller.provinces);

router.get("/districts/:provinceCode", controller.districts);

router.get("/wards/:districtCode", controller.wards);

export default router;