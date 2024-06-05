import fs from 'fs';
import path from 'path';

export const manageImages = (getDirPath, maxImages) => {
    return (req, res, next) => {
        const dirPath = getDirPath(req);

        try {
            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath).map(file => {
                    const filePath = path.join(dirPath, file);
                    return {
                        path: filePath,
                        ctime: fs.statSync(filePath).ctime
                    };
                });

                if (files.length > maxImages) {
                    // 오래된 파일부터 정렬
                    files.sort((a, b) => a.ctime - b.ctime);

                    // 초과된 파일 개수만큼 삭제
                    const filesToRemove = files.length - maxImages;
                    for (let i = 0; i < filesToRemove; i++) {
                        //console.log(files[i].path);
                        fs.unlinkSync(files[i].path);
                    }
                }
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};
