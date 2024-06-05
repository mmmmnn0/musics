import multer from 'multer';
import fs from 'fs';
import path from 'path';

const profileDir = 'profile';
if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.id; // URL에서 사용자 ID를 추출
        const userDir = `profile/${userId}`; // 사용자 ID별로 폴더 생성
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true }); // 폴더가 없으면 생성
        }
        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = "Profile";
        cb(null, filename + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 200 // 200MB 제한
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('지원되지 않는 파일 형식입니다.'), false);
        }
    }
});

export const uploadImage = upload.single('profile');
