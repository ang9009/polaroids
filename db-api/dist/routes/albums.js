"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statusCodes_1 = __importDefault(require("../data/statusCodes"));
const createAlbumQueryParams_1 = require("../types/request/createAlbumQueryParams");
const router = express_1.default.Router();
// Create an album
router.post("/", (req, res, next) => {
    const parseRes = createAlbumQueryParams_1.CreateAlbumQueryParamsSchema.safeParse(req.body);
    // !Figure out how to get the erorr message
    //! Finish guidls first
    if (!parseRes.success) {
        // const error = new HttpException(HttpStatusCode.BAD_REQUEST);
        // return next(error);
    }
    const { albumId, albumName } = req.body;
    // prisma.guild.create
    res.status(statusCodes_1.default.OK).json({ msg: "Success" });
});
exports.default = router;
