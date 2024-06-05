import mongoose from "mongoose";
import Music from "../models/Music.js"
import User from "../models/User.js"

const CommentSchema = new mongoose.Schema(
    {
        text: { // 댓글내용
            type: String, 
            required: true 
        },
        writer: { //작성자
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        music: { //댓글이 달리는 음악
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Music" 
        },
        createdAt: { //생성날짜
            type: Date, 
            required: true, 
            default: Date.now 
        },
    }
);


export default mongoose.model("Comment", CommentSchema);