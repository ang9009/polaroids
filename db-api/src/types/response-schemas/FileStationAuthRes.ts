import { z } from "zod";

// The response shape that is returned when getting a session id from FileStation
export const FileStationAuthResSchema = z.object({
  data: z.object({
    sid: z.string(),
  }),
  success: z.boolean(),
});
