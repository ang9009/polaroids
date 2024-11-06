"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
const notFound_1 = require("./middleware/notFound");
const albums_1 = __importDefault(require("./routes/albums"));
const guilds_1 = __importDefault(require("./routes/guilds"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Logger middleware
app.use(logger_1.logger);
// Routes
app.use("/api/album", albums_1.default);
app.use("/api/guild", guilds_1.default);
// Error handlers
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
