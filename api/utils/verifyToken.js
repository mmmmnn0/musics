import jwt from "jsonwebtoken";
import Music from "../models/Music.js";
import Comment from "../models/Comment.js";
import { createError } from "../utils/error.js";

// 토큰을 확인하고 사용자를 인증하는 미들웨어
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// 사용자를 확인하고 요청된 작업을 인가하는 미들웨어
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// 관리자를 확인하고 요청된 작업을 인가하는 미들웨어
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// 수정, 삭제를 위한 미들웨어
export const MusicUploader = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));

        try {
            console.log("Requested music ID:", req.params.id); // 추가된 로그
            const music = await Music.findById(req.params.id).populate('uploader');
            if (!music) {
                console.log("Music not found for ID:", req.params.id); // 추가된 로그
                return next(createError(404, "Music not found!"));
            }
            const MusicUploaderId = music.uploader._id.toString();

            const loggedInUserId = user.id;

            if (MusicUploaderId === loggedInUserId || user.isAdmin) {
                req.user = user;
                next();
            } else {
                return next(createError(403, "You are not authorized!"));
            }
        } catch (error) {
            next(error);
        }
    });
};

// 댓글 작성한 사용자 혹은 관리자 권한이 있는 사용자만이 리뷰를 수정, 삭제할 수 있게 함
export const CommentWriter = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));

        try {
            const comment = await Comment.findById(req.params.id).populate('writer');
            if (!comment) {
                return next(createError(404, "Comment not found!"));
            }
            const commentWriterId = comment.writer._id.toString();

            if (commentWriterId === user.id || user.isAdmin) {
                req.user = user;
                next();
            } else {
                return next(createError(403, "You are not authorized!"));
            }
        } catch (error) {
            next(error);
        }
    });
};
