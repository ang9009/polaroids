"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const colors_1 = __importDefault(require("colors"));
/**
 * Logger function for incoming requests.
 * @param req request object
 * @param res response
 * @param next next function
 */
const logger = (req, res, next) => {
    const methodColors = {
        GET: colors_1.default.green,
        POST: colors_1.default.red,
        PUT: colors_1.default.yellow,
        DELETE: colors_1.default.red,
    };
    const color = methodColors[req.method] || colors_1.default.white;
    console.log(color(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));
    next();
};
exports.logger = logger;
