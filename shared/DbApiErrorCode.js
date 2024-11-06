"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbApiErrorCode;
(function (DbApiErrorCode) {
    DbApiErrorCode[DbApiErrorCode["DB_EXCEPTION"] = 0] = "DB_EXCEPTION";
    DbApiErrorCode[DbApiErrorCode["GENERIC_EXCEPTION"] = 1] = "GENERIC_EXCEPTION";
    DbApiErrorCode[DbApiErrorCode["NOT_FOUND_EXCEPTION"] = 2] = "NOT_FOUND_EXCEPTION";
    DbApiErrorCode[DbApiErrorCode["REQUEST_EXCEPTION"] = 3] = "REQUEST_EXCEPTION";
})(DbApiErrorCode || (DbApiErrorCode = {}));
exports.default = DbApiErrorCode;
