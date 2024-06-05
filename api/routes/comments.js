import express from "express";
import {
    MusicComment,
    deleteComment,
    getComment,
    getComments
} from "../controllers/comment.js";
import { CommentWriter, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:musicid", CommentWriter, MusicComment);

//DELETE
router.delete("/:id", CommentWriter, deleteComment);

//GET
router.get("/:musicid", getComment);

//GET ALL
router.get("/", getComments);

export default router;