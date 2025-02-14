"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../../data/statusCodes"));
/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class RequestException {
    constructor(invalidParams) {
        this.status = statusCodes_1.default.BAD_REQUEST;
        this.name = "RequestException";
        this.message = invalidParams.message;
    }
    getResponse() {
        return { invalidParams: this.message };
    }
}
exports.default = RequestException;
