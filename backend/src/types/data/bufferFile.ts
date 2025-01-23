import { AllowedMimeTypes } from "shared/src/data/allowedMimeTypes";

export interface BufferFile {
  buffer: ArrayBuffer;
  discordId: string;
  mimetype: AllowedMimeTypes;
  fileLink?: string;
}
