import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPw = ({ user, apiUrl, setShowPasswordForm }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCurrent = async (e) => {
        setCurrentPassword(e.target.value);
        try {
            const res = await axios.post(
                `${apiUrl}/auth/verify-password`,
                {
                    userId: user._id,
                    password: e.target.value,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("Server response:", res.data);

            if (!res.data.success) {
                setPasswordError("일치X");
            } else {
                setPasswordError("");
            }
        } catch (err) {
            console.log(err);
            setPasswordError("현재 비밀번호와 일치하지 않습니다.");
        }
    };

    const handleConfirm = async (e) => {
        setConfirmPassword(e.target.value);
        if (newPassword !== e.target.value) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(
                `${apiUrl}/users/${user._id}/password`,
                {
                    currentPassword,
                    newPassword,
                },
                {
                    withCredentials: true,
                }
            );
            setShowPasswordForm(false);
            setLoading(false);
            navigate("/profile");
        } catch (err) {
            console.error("Error updating password:", err);
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <form className="madalForm">
                    <h2 className="pageTitle2">비밀번호 변경하기</h2>
                    <label className="editPwLabel" htmlFor="CurrentPW">
                        이전 비밀번호
                    </label>

                    <input
                        type="password"
                        id="CurrentPW"
                        autoComplete="off"
                        className="madalInput"
                        onChange={handleCurrent}
                    />
                    <div className="error">
                        {passwordError && (
                            <div className="error-message">{passwordError}</div>
                        )}
                    </div>
                    <label className="editPwLabel" htmlFor="password">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="madalInput"
                        autoComplete="off"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="error"></div>
                    <label className="editPwLabel" htmlFor="ConfirmPW">
                        비밀번호 확인
                    </label>
                    <input
                        type="password"
                        id="ConfirmPW"
                        className="madalInput"
                        autoComplete="off"
                        onChange={handleConfirm}
                    />
                    <div className="error">
                        {confirmPasswordError && (
                            <div className="confirm-Error-message">
                                {confirmPasswordError}
                            </div>
                        )}
                    </div>
                    <div className="Btn">
                        <button
                            type="submit"
                            className="editBtn"
                            disabled={loading}
                            onClick={handleClick}
                        >
                            비밀번호 변경하기
                        </button>
                        <button
                            type="button"
                            className="cancleBtn"
                            onClick={() => setShowPasswordForm(false)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPw;
