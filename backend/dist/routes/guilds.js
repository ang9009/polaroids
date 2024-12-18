"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statusCodes_1 = __importDefault(require("../data/statusCodes"));
const successJson_1 = __importDefault(require("../data/successJson"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const requestException_1 = __importDefault(require("../types/error/requestException"));
const createGuildQueryParams_1 = require("../types/request/createGuildQueryParams");
const handleDbException_1 = __importDefault(require("../utils/handleDbException"));
const router = express_1.default.Router();
// Add a guild
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parseRes = createGuildQueryParams_1.CreateGuildQueryParamsSchema.safeParse(req.body);
    if (!parseRes.success) {
        const error = new requestException_1.default(parseRes.error);
        return next(error);
    }
    const { guildId } = req.body;
    try {
        yield prisma_1.default.guild.create({
            data: {
                guildId: guildId,
            },
        });
    }
    catch (err) {
        return (0, handleDbException_1.default)(err, next);
    }
    res.status(statusCodes_1.default.OK).json(successJson_1.default);
}));
exports.default = router;
