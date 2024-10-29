"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const statusCodes_1 = __importDefault(require("../data/statusCodes"));
/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
const notFound = (req, res, next) => {
    const error = new Error("Not found");
    const apiError = { status: statusCodes_1.default.NOT_FOUND, error: error };
    next(apiError);
};
exports.notFound = notFound;
