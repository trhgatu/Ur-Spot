"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_1 = __importDefault(require("../controllers/location"));
const router = express_1.default.Router();
router.get("/", location_1.default.index);
router.post("/create", location_1.default.create);
exports.default = router;
