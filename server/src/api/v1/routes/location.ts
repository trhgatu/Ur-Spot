import express from "express";
import controller from "../controllers/location";

const router = express.Router();

router.get("/", controller.index);
router.post("/create", controller.create);
router.get("/:id", controller.getLocationById);
export default router;