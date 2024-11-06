"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../../data/statusCodes"));
/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
class GenericException {
    constructor(message) {
        this.status = statusCodes_1.default.INTERNAL_SERVER_ERROR;
        this.message = message;
        this.name = "RuntimeException";
    }
    getResponse() {
        return { message: this.message };
    }
}
exports.default = GenericException;
