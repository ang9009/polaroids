import express from "express";
import {
  filterExistingFileIds,
  getFileLink,
  getFilesData,
  uploadFiles,
} from "../controllers/files.controller";

const router = express.Router();

// Uploads the given files to FileStation, and records them in the database
router.post("/", uploadFiles);

// Filters a given list of ids for ids that have not already been uploaded
router.get("/filter-existing-ids", filterExistingFileIds);

// Retrieves files paginated via cursor-based pagination
router.get("/data", getFilesData);

// Downloads the specified media file
router.get("/link", getFileLink);

export default router;
