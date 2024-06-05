import mongoose from "mongoose";
import Comment from "../models/Comment.js"
import User from "../models/User.js"

const MusicSchema = new mongoose.Schema(
    {
        title: { //파일 이름
            type: String,
            required: true,
        },
        fileurl: { //음악파일
            type: String,
            required: true,
        },
        thumbimgUrl: { //썸네일이미지
            type: String,
            required: true,
        },
        desc: { // 파일 소개
            type: String,
        },
        createdAt: { // 생성날짜
            type: Date, 
            default: Date.now 
        },
        // like: { // 좋아요 수
        //     type: Number,
        //     default : 0,
        //},
        views: { // 재생횟수
            type: Number,
            default : 0,
            required: true, 
        },
        uploader: { // 업로더
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true,
        },
        comments: [ // 달린 댓글
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Comment" 
            },
          ],
    },

);

export default mongoose.model("Music", MusicSchema);