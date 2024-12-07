import express from "express";
import { albumExists, getAlbums } from "../controllers/albums.controller";
const router = express.Router();
// Get all existing albums
router.get("/", getAlbums);
// Check if an album exists
router.head("/album-exists/:albumName", albumExists);
export default router;
