import express from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/media.controller";

const router = express.Router();
const upload = multer({ limits: { fileSize: 2 * 10 ** 9 } });

router.post("/", upload.array("media", 15), uploadMedia);
