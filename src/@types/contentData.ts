import { ContentType } from "./contentType.js";
import { People } from "./people.js";

/**
 * Data for an image/video to be uploaded, including the file itself, a unique id,
 * the people in the
 */
export interface ContentData {
  file: Blob;
  date: Date;
  id: string;
  people: People[];
  contentType: ContentType;
}
