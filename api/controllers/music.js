import Music from "../models/Music.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

// CREATE
export const createMusic = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
        let fileurl = "", thumbimgUrl = ""; // 변수 초기화

           // 파일 경로가 존재하는지 확인
           if (!req.files || !req.files.fileurl || !req.files.thumbimgUrl) {
            return res.status(400).json({ message: "파일이 제공되지 않았습니다." });
            }

        fileurl = req.files.fileurl[0].path; // 파일 경로
        thumbimgUrl = req.files.thumbimgUrl[0].path; // 썸네일 파일 경로

        const newMusic = new Music({
            title,
            desc,
            fileurl,
            thumbimgUrl,
            uploader: req.user.id,
        });

        const savedMusic = await newMusic.save();
        res.status(200).json(savedMusic);
    } catch (err) {
        console.error("Error creating music:", err);
        next(err);
    }
};

// UPDATE
export const updateMusic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = res.locals.user;

        // Music 조회
        const music = await Music.findById(id);

        // Music uploader인지 확인
        if (user_id !== String(music.uploader)) {
            // 관리자인지 확인
            const user = await User.findById(user_id);
            if (!user.isAdmin) {
                return res.status(401).json({ message: "권한이 없습니다." });
            }
        }

        // Music 업데이트
        const updatedMusic = await Music.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedMusic);
    } catch (err) {
        next(err);
    }
};


// DELETE
export const deleteMusic = async (req, res, next) => {
    try {
        // 해당 ID의 music 찾기
        const music = await Music.findByIdAndDelete(req.params.id);

        // user ID 가져오기
        const { user_id } = res.locals.user;

        // uploader인지 확인
        if (user_id !== String(music.uploader)) {
            // 관리자인지 확인
            const user = await User.findById(user_id);
            if (!user.isAdmin) {
                return res.status(401).json({ message: "권한이 없습니다." });
            }
        }

        res.status(200).json("삭제되었습니다.");
    } catch (err) {
        next(err);
    }
};


// GET
export const getMusic = async (req, res, next) => {
    try {
        const music = await Music.findById(req.params.id)
            .populate("uploader")
            .populate({
                path: "comments",
                populate: { path: "writer" },
            });
        res.status(200).json(music);
    } catch (err) {
        console.error("Error fetching music:", err);
        next(err);
    }
};

// GET ALL
export const getMusics = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    try {
        const musics = await Music.find({})
            .populate("uploader")
            .populate({
                path: "comments",
                populate: { path: "writer" },
            })
            .limit(limit);
        res.status(200).json(musics);
    } catch (err) {
        next(err);
    }
};

// GET COMMENT
export const getMusicComments = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ music: id }).populate("writer");
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

// // COUNT FOLLOWER
// export const countByFollower = async (req, res, next) => {
//     const followers = req.query.followers.split(",");
//     try {
//         const list = await Promise.all(
//             followers.map((follower) => {
//                 return User.countDocuments({ follower: follower });
//             })
//         );
//         res.status(200).json(list);
//     } catch (err) {
//         next(err);
//     }
// };

// // COUNT FOLLOWING
// export const countByFollowing = async (req, res, next) => {
//     const followings = req.query.followings.split(",");
//     try {
//         const list = await Promise.all(
//             followings.map((following) => {
//                 return User.countDocuments({ following: following });
//             })
//         );
//         res.status(200).json(list);
//     } catch (err) {
//         next(err);
//     }
// };

// COUNT VIEWS
// export const countByView = async (req, res, next) => {
//     try {
//         const viewCount = await View.countDocuments({ type: "view" });

//         res.status(200).json([{ type: "view", count: viewCount }]);
//     } catch (err) {
//         next(err);
//     }
// };