import express from "express";
import controller from "../controllers/category";

const router = express.Router();

router.get("/", controller.index);
router.post("/create", controller.create);

export default router;