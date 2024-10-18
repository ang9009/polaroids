import { People } from "./people.js";
import { SupportedContentType } from "./supportedContentType.js";

/**
 * Data for an image/video to be uploaded, including the file itself, a unique
 * id (from discord), the people in the photo, and the content type
 */
export interface AttachmentUploadData {
  file: File;
  id: string;
  people: People[];
  contentType: SupportedContentType;
}
