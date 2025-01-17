import { z } from "zod";
import HttpStatusCode from "../../data/statusCodes";
/**
 * An exception that has an HTTP status code tied to it.
 */
interface HttpException extends Error {
    readonly status: HttpStatusCode;
    getResponse(): unknown;
}
export declare const HttpExceptionSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof HttpStatusCode>;
    getResponse: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    status: HttpStatusCode;
    getResponse: (...args: unknown[]) => unknown;
}, {
    status: HttpStatusCode;
    getResponse: (...args: unknown[]) => unknown;
}>;
export { HttpException };
