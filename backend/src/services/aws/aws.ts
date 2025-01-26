import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getExtensionFromMimetype } from "shared/src/helpers/getExtensionFromMimetype";
import { BufferFile } from "../../types/data/bufferFile";
import { FileBucketClient } from "./fileBucketClient";

// The subfolders in the AWS bucket.
export enum AWSFolder {
  Thumbnails = "thumbnails",
  Media = "media",
}

/**
 * Uploads a given file to the Wasabi file bucket.
 * @param files the files to be uploaded
 * @param folder the folder to be uploaded to
 */
export const uploadFiles = async (files: BufferFile[], folder: AWSFolder) => {
  const { WASABI_BUCKET_NAME } = process.env;

  const s3 = FileBucketClient.getInstance();
  for (const file of files) {
    const extension = getExtensionFromMimetype(file.mimetype);
    const params = {
      Bucket: WASABI_BUCKET_NAME!,
      Key: `${folder}/${file.discordId}.${extension}`,
      Body: Buffer.from(file.buffer),
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
  }
};

/**
 * Gets a specified file url from the file bucket.
 * @param fileName the full file name (including its extension), e.g. asdf.png
 * @param folder the folder from which the file should be fetched from
 * @returns the url corresponding to the requested file`
 */
export const getFileUrl = async (fileName: string, folder: AWSFolder) => {
  const { WASABI_BUCKET_NAME } = process.env;

  const s3 = FileBucketClient.getInstance();
  const command = new GetObjectCommand({
    Bucket: WASABI_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};
