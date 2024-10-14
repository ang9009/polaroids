import { People } from "./people.js";

/**
 * Data for an image to be uploaded, including the image itself, a unique id,
 * and the people in it.
 */
export interface ImageUploadData {
  file: File;
  date: Date;
  id: string;
  people: People[];
}
