import express from "express";
import controller from "../controllers/location";

const router = express.Router();

router.get("/", controller.index);

export default router;