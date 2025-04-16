"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = __importDefault(require("./location"));
const category_1 = __importDefault(require("./category"));
const router = (app) => {
    const version = "/api/v1";
    app.use(version + "/locations", location_1.default);
    app.use(version + "/categories", category_1.default);
};
exports.default = router;
