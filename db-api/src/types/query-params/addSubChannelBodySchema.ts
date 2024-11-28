import { AlbumRequestType } from "shared/subbed-channel-requests/albumRequestType";
import { z } from "zod";

export const AddSubChannelBodySchema = z
  .object({
    channelId: z.string({
      invalid_type_error: "channelId must be a string",
      required_error: "channelId is required",
    }),
    albumRequestType: z.nativeEnum(AlbumRequestType),
    albumName: z.string({
      invalid_type_error: "albumName must be a string",
      required_error: "albumName is required",
    }),
    albumDesc: z
      .string({
        invalid_type_error: "albumDesc must be a string",
      })
      .optional(),
    guildId: z.string({
      invalid_type_error: "guildId must be a string",
      required_error: "guildId is required",
    }),
  })
  .refine(
    (req) => {
      const albumType = req.albumRequestType;
      if (albumType == AlbumRequestType.CREATE_NEW && !req.albumDesc) {
        return false;
      }
    },
    {
      message: "If you are creating a new album, the albumDesc property is required",
    }
  );

export type AddSubChannelBodyParams = z.infer<typeof AddSubChannelBodySchema>;
