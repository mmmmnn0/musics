import express from "express";
import {
    createMusic,
    updateMusic,
    deleteMusic,
    getMusic,
    getMusics,
    getMusicComments,
} from "../controllers/music.js";
import { uploadImage } from '../utils/uploadImage.js';
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, uploadImage, createMusic);

//UPDATE
router.put("/:id", verifyUser, uploadImage, updateMusic);

//DELETE
router.delete("/:id", verifyUser, deleteMusic);

//GET
router.get("/:id", getMusic);

//GET Music Comments
router.get("/:id/comments", getMusicComments);

//GET ALL
router.get("/", getMusics);

export default router;
