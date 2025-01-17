import { z } from "zod";
import HttpStatusCode from "../../data/statusCodes";
export const HttpExceptionSchema = z.object({
    status: z.nativeEnum(HttpStatusCode),
    getResponse: z.function(),
});
