"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbException_1 = __importDefault(require("../types/error/dbException"));
const genericException_1 = __importDefault(require("../types/error/genericException"));
const prismaError_1 = require("../types/error/prismaError");
const handleDbException = (err, next) => {
    if ((0, prismaError_1.isPrismaClientError)(err)) {
        const error = new dbException_1.default(err);
        return next(error);
    }
    const error = new genericException_1.default("An unknown database-related exception occurred: " + err);
    return next(error);
};
exports.default = handleDbException;
