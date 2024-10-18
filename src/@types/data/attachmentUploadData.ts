import { People } from "./people.js";
import { SupportedContentType } from "./supportedContentType.js";

/**
 * Data for an photo/video to be uploaded.
 */
export abstract class AttachmentUploadData {
  public readonly file: File;
  public readonly id: string;
  public readonly people: People[];
  public readonly contentType: SupportedContentType;

  /**
   * Constructor for an AttachmentUploadData object.
   * @param file the file to be uploaded. This file's name should be the
   *             Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  protected constructor(
    file: File,
    id: string,
    people: People[],
    contentType: SupportedContentType,
  ) {
    this.file = file;
    this.id = id;
    this.people = people;
    this.contentType = contentType;
  }

  /**
   * Uploads the file to PhotoStation.
   * @param folderPath the folder the file will be saved to
   */
  public abstract upload(folderPath: string): void;
}
