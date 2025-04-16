"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./api/v1/routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const corsOptions = {
            origin: "*",
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"],
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        (0, index_1.default)(app);
        const httpServer = (0, http_1.createServer)(app);
        httpServer.listen(port, () => {
            console.log(`Backend đang chạy trên cổng ${port}`);
        });
    }
    catch (error) {
        console.error('Lỗi khi kết nối cơ sở dữ liệu:', error);
    }
};
startServer();
