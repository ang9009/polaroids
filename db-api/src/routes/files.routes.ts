import express from "express";
import { uploadFiles } from "../controllers/files.controller";

const router = express.Router();

router.post("/", uploadFiles);

export default router;
