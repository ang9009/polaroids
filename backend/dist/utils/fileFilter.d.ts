/// <reference types="express-serve-static-core" />
/// <reference types="express-session" />
/// <reference types="passport" />
import { Request } from "express";
import { FileFilterCallback } from "multer";
/**
 * File filter to ensure that only images and videos are uploaded.
 * @param req request object
 * @param file file object
 * @param cb Multer's file filter callback
 */
export declare const fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void;
