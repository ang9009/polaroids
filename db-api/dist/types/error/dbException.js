"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../../data/statusCodes"));
/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
class DbException {
    constructor(prismaError) {
        this.status = statusCodes_1.default.INTERNAL_SERVER_ERROR;
        this.name = "DbException";
        this.message = prismaError.message;
    }
    getResponse() {
        return { message: this.message };
    }
}
exports.default = DbException;
