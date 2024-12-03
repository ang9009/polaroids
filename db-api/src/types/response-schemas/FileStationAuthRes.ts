import { z } from "zod";

// The response shape of the data property that is returned when getting a session id
// from FileStation
export const FileStationAuthDataSchema = z.object({
  sid: z.string(),
});

export type FileStationAuthData = z.infer<typeof FileStationAuthDataSchema>;
