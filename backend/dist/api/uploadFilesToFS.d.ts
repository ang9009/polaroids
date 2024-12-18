import "dotenv/config";
/**
 * Uploads the given files to FileStation.
 * @param files the files to be uploaded
 */
export declare const uploadFilesToFS: (files: Express.Multer.File[]) => Promise<void>;
