import { z } from "zod";
declare const IsSubscribedResponseSchema: z.ZodDiscriminatedUnion<"isSubscribed", [z.ZodObject<{
    isSubscribed: z.ZodLiteral<true>;
    linkedAlbumId: z.ZodString;
    linkedAlbumName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    isSubscribed: true;
    linkedAlbumId: string;
    linkedAlbumName: string;
}, {
    isSubscribed: true;
    linkedAlbumId: string;
    linkedAlbumName: string;
}>, z.ZodObject<{
    isSubscribed: z.ZodLiteral<false>;
}, "strip", z.ZodTypeAny, {
    isSubscribed: false;
}, {
    isSubscribed: false;
}>]>;
type IsSubscribedResponse = z.infer<typeof IsSubscribedResponseSchema>;
export { IsSubscribedResponse, IsSubscribedResponseSchema };
