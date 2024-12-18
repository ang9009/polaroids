import express from "express";
import { albumExists, createAlbum, editAlbum, getAlbums } from "../controllers/albums.controller";

const router = express.Router();

// Get all existing albums
router.get("/", getAlbums);

// Check if an album exists
router.head("/album-exists/:albumName", albumExists);

// Create a new album
router.post("/", createAlbum);

// Edit an existing album
router.patch("/", editAlbum);

export default router;