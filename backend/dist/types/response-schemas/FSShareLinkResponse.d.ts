import { z } from "zod";
export declare const FSShareLinkResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        links: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        links: {
            url: string;
        }[];
    }, {
        links: {
            url: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        links: {
            url: string;
        }[];
    };
}, {
    data: {
        links: {
            url: string;
        }[];
    };
}>;
export type FSShareLinkResponse = z.infer<typeof FSShareLinkResponseSchema>;
