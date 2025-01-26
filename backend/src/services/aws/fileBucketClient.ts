import { S3 } from "@aws-sdk/client-s3";

/**
 * A singleton wrapper for the AWS S3 client.
 */
export class FileBucketClient {
  private static client: S3;

  /**
   * Creates a new instance of a FileBucket client.
   * @param client the client
   */
  private constructor(client: S3) {
    FileBucketClient.client = client;
  }

  /**
   * Gets the singleton instance of the file bucket client.
   * @returns the file bucket client
   */
  public static getInstance = (): S3 => {
    if (!FileBucketClient.client) {
      // S3 credentials
      FileBucketClient.client = new S3({
        region: "us-east-1",
        endpoint: "https://s3.us-east-1.wasabisys.com",
      });
    }

    return FileBucketClient.client;
  };
}
