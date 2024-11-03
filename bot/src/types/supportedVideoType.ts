import { FileExtension } from "./fileExtension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";

/**
 * Video types that polaroids supports.
 */
export class SupportedVideoType extends SupportedContentType {
  public static readonly MP4 = new SupportedVideoType(FileExtension.MP4, MimeType.MP4);
  public static readonly MOV = new SupportedVideoType(FileExtension.MOV, MimeType.MOV);
  public static readonly MPEG = new SupportedVideoType(FileExtension.MPEG, MimeType.MPEG);
}
