import { Router } from "express";
import { createFolder } from "../controllers/folders.controller";

const router = Router();

router.post("/", createFolder);

export default router;
