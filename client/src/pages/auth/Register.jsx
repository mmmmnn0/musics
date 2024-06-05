import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        phone: "",
        nickname: "",
    });
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();

    // 입력 정보 저장
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    // 비밀번호 확인 입력 저장
    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    // 회원가입 정보 전송 및 검증
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(
                `${apiUrl}/auth/register`,
                credentials
            );
            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            alert("회원가입 실패: " + err.message);
        }
    };

    return (
        <div className="authForm">
            <div className="authWrapper">
                <div className="pageTitle">REGISTER</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        className="authInput"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        className="authInput"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="authInput"
                        autoComplete="off"
                        onChange={handlePasswordConfirm}
                    />
                    <label htmlFor="phone">전화번호</label>
                    <input
                        type="text"
                        id="phone"
                        className="authInput"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <button type="submit" className="authBtn1">
                        회원가입
                    </button>
                    <button
                        type="button"
                        className="backBtn2"
                        onClick={() => navigate(-1)}
                    >
                        뒤로 가기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
