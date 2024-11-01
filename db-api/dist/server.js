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
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(logger_1.logger);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
