import { Extension } from "./extension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";

/**
 * Video types that polaroids supports.
 */
export class SupportedVideoType extends SupportedContentType {
  public static readonly MP4 = new SupportedVideoType(Extension.MP4, MimeType.MP4);
  public static readonly MOV = new SupportedVideoType(Extension.MOV, MimeType.MOV);
  public static readonly MPEG = new SupportedVideoType(Extension.MPEG, MimeType.MPEG);
}
