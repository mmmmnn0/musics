import mongoose from "mongoose";
import Comment from "../models/Comment.js"
import Music from "../models/Music.js"

const UserSchema = new mongoose.Schema(
    {
        isAdmin: { //관리자유무
            type: Boolean,
            default: false,
        },
        username: { //아이디
            type: String,
            required: true,
            unique: true,
        },
        password: { //패스워드
            type: String,
            required: true,
        },
        nickname: {//닉네임
            type: String,
            unique: true,
        },
        phone: { //핸드폰번호
            type: String,
            required: true,
            unique: true,
        },
        profileimg: { //프로필이미지
            type: String,
        },
        comments: { // 내가 단 댓글
            type: [String],
        },
        bio: { // 소개
            type: String,
        },
        musics: [{  // 뮤직포스트
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Music" 
        }],
        comments: [{ //댓글
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment" 
        }],
        // follower: { // 나를 팔로우
        //     type: [String],
        //     default : 0,
        // },
        // follwing: { // 내가 팔로우
        //     type: [String],
        //     default : 0,
        // },
        // playlist: [{ listname: String, listfile: {type: [String]}}],
    },
    { timestamps: true } //계정 생성 시간
);

export default mongoose.model("User", UserSchema);