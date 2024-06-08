import Music from "../models/Music.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import bcrypt from 'bcryptjs';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// UPDATE
export const updateUser = async (req, res, next) => {
    try {

        // 이미지 업로드 처리
        if (req.files && req.files.profileimg) {
            req.body.profileimg = `/uploads/${req.files.profileimg[0].filename}`;
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ user: updatedUser, message: "프로필이 수정되었습니다." });    
    } catch (err) {
        next(err);
    }
};

//비밀번호 변경
export const updatePassword = async (req, res, next) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        console.log(`Updating password for user: ${userId}`);

        // 사용자 정보를 DB에서 가져옴
        const user = await User.findById(userId);
        if (!user) {
            console.error("User not found");
            return res.status().json({ success: false, message: "User not found" });
        }

        // 입력한 현재 비밀번호가 맞는지 확인
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            console.error("Invalid current password");
            return res.status(401).json({ success: false, message: "Invalid current password" });
        }

        // 새 비밀번호를 암호화하여 저장
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        console.error("Error updating password:", err);
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

// GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate("musics");
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// GET (유저가 업로드한 뮤직)
export const getUserMusics = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id) 
            .populate("musics")
            .populate({ path: "musics", populate: { path: "uploader" } });
        
            const list = await Promise.all(
            user.musics.map((music) => {
                return Music.findById(music);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};

// GET (유저가 작성한 코멘트)
export const getUserComments = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id) 
            .populate("comments")
            .populate({ path: "comments", populate: { path: "writer" } });
        
            const list = await Promise.all(
            user.comments.map((comment) => {
                return Comment.findById(comment);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
