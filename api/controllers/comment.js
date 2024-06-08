import Music from "../models/Music.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

// CREATE
export const MusicComment = async (req, res) => {
    // user 정보 가져오기
    const user = res.locals.user;

    // music ID 가져오기
    const { id } = req.params;

    // comment 내용 가져오기
    const { comment } = req.body;

    // 해당 ID를 가진 music 찾기
    const music = await Music.findById(id);

    // user 정보 찾기
    const searchedUser = await User.findById(user.user_id);

    // music 없음 오류
    if (!music) {
        return res.status().end();
    }

    // comment 생성
    const newComment = await Comment.create({
        text: comment,
        writer: searchedUser._id,
        music: music._id,
    });

    // music에 comment 추가 및 저장
    music.comments.push(newComment);
    music.save();

    // user에게 comment 추가 및 저장
    searchedUser.comments.push(newComment);
    searchedUser.save();

    // SUCCESS
    return res.status(201).end();
};

// DELETE
export const deleteComment = async (req, res) => {
    // music ID 가져오기
    const { id } = req.params;

    // 삭제할 comment ID 가져오기
    const { commentid } = req.body;

    // 해당 ID를 가진 music 찾기
    const music = await Music.findById(id);

    // 해당 ID를 가진 comment 찾기
    const comment = await Comment.findById(commentid);

    // user 정보 가져오기
    const { user_id } = res.locals.user;

    const foundUser = await User.findById(user_id);

    // 삭제 권한 없음
    if (user_id !== String(comment.writer)) {
        return res.status(401).json({ message: "댓글을 삭제할 수 없습니다." });
    }

    // comment 없음
    if (!comment) {
        return res.status(400).json({ message: "존재하지 않는 댓글입니다." });
    }

    // comment 삭제
    await Comment.findByIdAndDelete(commentid);

    // music 없음
    if (!music) {
        return res.status(400).json({ message: "존재하지 않는 음악입니다." });
    }

    // 선택한 comment를 music의 comment 목록에서 제거 및 저장
    music.comments = music.comments.filter(
        (comment) => String(comment) !== commentid
    );
    await music.save();

    // user의 comment 목록에서 제거 및 저장
    foundUser.comments = foundUser.comments.filter(
        (comment) => String(comment) !== commentid
    );
    await foundUser.save();

    // SUCCESS
    res.status(200).json({ message: "댓글이 삭제되었습니다." });
};

// GET
export const getComment = async (req, res) => {
    try {
        // music ID 가져오기
        const { id } = req.params;

        // 해당 ID를 가진 music 찾기 및 comment writer 정보 가져오기
        const music = await Music.findById(id).populate({
            path: "comments",
            populate: {
                path: "writer",
            },
        });

        // comment 최신순 정렬
        const comments = music.comments.sort(
            (a, b) => b.createdAt - a.createdAt
        );

        res.status(201).send(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "댓글을 가져오지 못했습니다." });
    }
};


// GET ALL
export const getComments = async (req, res) => {
    try {
        // 모든 댓글 가져오기
        const comments = await Comment.find().populate("writer");

        // 댓글을 최신순으로 정렬
        comments.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "댓글을 가져오지 못했습니다." });
    }
};
