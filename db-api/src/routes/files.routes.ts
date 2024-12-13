import express from "express";
import { filterExistingFileIds, uploadFiles } from "../controllers/files.controller";

const router = express.Router();

router.post("/", uploadFiles);

// Filters a given list of ids for ids that have not already been uploaded
router.get("/filter-existing-ids", filterExistingFileIds);

export default router;
