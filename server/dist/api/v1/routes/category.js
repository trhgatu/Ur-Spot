"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controllers/category"));
const router = express_1.default.Router();
router.get("/", category_1.default.index);
router.post("/create", category_1.default.create);
exports.default = router;
