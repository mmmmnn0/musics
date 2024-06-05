import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send('User has been created');
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    try {
        if(!user) {
            return next(createError(404, "User not found"));
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect) {
            return next(createError(400, "Password is incorrect"));
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // user._doc 실제 데이터만 포함하는 순수 JavaScript 객체
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        }).status(200)
        .json({details: {...otherDetails}, isAdmin, token});
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'strict',
    }).status(200)
    .json({message: "Logged out successfully"});
};


export const verifyPassword = async (req, res, next) => {
    const { userId, password } = req.body;

    try {
        // 사용자 정보를 DB에서 가져옴
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 입력한 비밀번호와 저장된 비밀번호를 비교
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        res.status(200).json({ success: true, message: "Password is correct" });
    } catch (err) {
        next(err);
    }
};