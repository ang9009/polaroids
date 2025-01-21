import { AllowedMimeTypes } from "shared/src/data/allowedMimeTypes";

export interface BufferFile {
  buffer: ArrayBuffer;
  fileName: string;
  mimetype: AllowedMimeTypes;
}
