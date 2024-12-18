"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuildQueryParamsSchema = void 0;
const zod_1 = require("zod");
const CreateGuildQueryParamsSchema = zod_1.z.object({
    guildId: zod_1.z.string({
        invalid_type_error: "Guild id must be a string",
        required_error: "Guild id is required",
    }),
});
exports.CreateGuildQueryParamsSchema = CreateGuildQueryParamsSchema;
