
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import musicsRoute from "./routes/musics.js"
import commentsRoute from "./routes/comments.js";


// Express 애플리케이션 인스턴스 생성
const app = express();

// 환경 변수 로드
dotenv.config();

// MongoDB 연결 함수
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

//MongoDB 연결 해제 이벤트 핸들러
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//*/--- CORS 미들웨어 설정

// CORS 옵션
const corsOption = {
    // 클라이언트의 Origin
    origin: process.env.CLIENT_URL,

    // 인증 정보 허용
    credentials: true,
};

//모든 도메인에서의 요청을 허용하는 기본 CORS 설정을 사용
app.use(cors(corsOption));

//클라이언트로부터 전송된 쿠키를 파싱하여 req.cookies 객체에 저장
app.use(cookieParser());

// JSON 요청 본문 파싱 ---//*/
app.use(express.json());

// API 엔드포인트 설정
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/musics", musicsRoute);
app.use("/api/comments", commentsRoute);

app.use('/uploads', express.static('uploads'));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
app.use(morgan('combined'));

//전역 오류 처리를 위한 미들웨어
app.use((err, req, res, next) => {
    console.error("Unhandled error: ", err)
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


// 서버 시작 및 MongoDB 연결 시도
app.listen(process.env.PORT, () => {
    connect();
    console.log(`Connected to ${process.env.PORT}`);
});
