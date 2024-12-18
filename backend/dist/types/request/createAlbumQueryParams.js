"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlbumQueryParamsSchema = void 0;
const zod_1 = require("zod");
const CreateAlbumQueryParamsSchema = zod_1.z.object({
    albumId: zod_1.z.string({
        invalid_type_error: "Album id must be a string",
        required_error: "Album id is required",
    }),
    albumName: zod_1.z.string({
        invalid_type_error: "Album name must be a string",
        required_error: "Album name is required",
    }),
});
exports.CreateAlbumQueryParamsSchema = CreateAlbumQueryParamsSchema;
