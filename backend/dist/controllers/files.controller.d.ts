import { GetFilesDataResponse } from "shared/src/responses/files/getFilesData";
import { NextFunction, Request, Response } from "express";
import { GetFilesRequest } from "shared/src/requests/files/getFiles";
import { FilterExistingFileIdsResponse } from "shared/src/responses/files/filterExistingFileIds";
import { UploadFilesResponse } from "shared/src/responses/files/uploadFiles";
/**
 * Uploads the given files to FileStation, and tracks each photo/video in the
 * database. Note that each file will be saved as discordId.fileExtension in FileStation.
 *
 * Route: POST /api/files
 *
 * Request Body:
 * {
 *    throwUniqueConstraintError: boolean, // Whether the request should return an
 *                                             error if there is a unique constraint issue
 *    albumName: string, // The name of the album the files should be uploaded to
 *    files: File[], // The files of the photos and/or videos to be uploaded.
 *                      The filename (originalname) should be the Discord attachment id.
 *    filesData: { // Objects containing data relating to each file
 *      discordId: { // The file's Discord attachment id
 *        fileName: string, // The name of the file
 *        createdAt: DateTime? // When the file was uploaded. If undefined, this
 *                                 will default to now
 *        uploaderId: string, // The discord id of the uploader (user)
 *        fileExtension: string // The file's extension
 *      }
 *      ...
 *    }
 * }
 *
 * Response:
 * {
 *     filesUploaded: number // The number of files that were successfully uploaded
 * }
 */
export declare const uploadFiles: (req: Request, res: Response<UploadFilesResponse>, next: NextFunction) => Promise<void>;
/**
 * Filters a given list of file ids for ids corresponding to files that have not
 * already been uploaded.
 *
 * Route: GET /api/files/filter-existing-ids
 *
 * Request body:
 * {
 *    fileIds: string[], // The list of ids to be filtered
 * }
 *
 * Response body:
 * {
 *    filteredIds: string[], // The list of filtered ids
 * }
 */
export declare const filterExistingFileIds: (req: Request, res: Response<FilterExistingFileIdsResponse>, next: NextFunction) => Promise<void>;
/**
 * Retrieves file data paginated via cursor-based pagination.
 *
 * Route: GET /api/files/data
 *
 * Query parameters: see GetFilesRequest
 */
export declare const getFilesData: (req: Request<GetFilesRequest>, res: Response<GetFilesDataResponse>, next: NextFunction) => Promise<void>;
/**
 * Retrieves media from FileStation.
 *
 * Route: GET /api/files/download
 */
export declare const downloadFile: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
