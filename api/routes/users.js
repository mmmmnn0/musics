import express from 'express';
import { updateUser, deleteUser, getUser, getUsers, getUserMusics, getUserComments, updatePassword } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { uploadImage } from '../utils/uploadImage.js';
import { manageImages } from '../utils/manageImages.js';


const router = express.Router();

// UPDATE
// router.put("/:id", verifyUser, updateUser);
router.put('/:id', verifyUser, uploadImage, manageImages((req) => `profile/${req.params.id}`, 2), updateUser);

// 비밀번호 변경
router.put('/:userId/password', updatePassword);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);

// GET (작성한 포스팅 전체보기) 
router.get('/post/:id', getUserMusics);

// GET (작성한 댓글 전체보기)
router.get('/comment/:id', getUserComments);


export default router;