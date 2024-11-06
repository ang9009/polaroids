"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFoundException_1 = __importDefault(require("../types/error/notFoundException"));
/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
const notFound = (req, res, next) => {
    const error = new notFoundException_1.default();
    next(error);
};
exports.notFound = notFound;
