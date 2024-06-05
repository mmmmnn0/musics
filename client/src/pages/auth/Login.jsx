import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";
import "./auth.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log("handelChange");
    };
    
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        console.log("로그인 시작");
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log("apiUrl: ", apiUrl);
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, {
                withCredentials: true,
            });

            console.log("res: ", res);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            console.log("로그인 됨");
            navigate("/");
        } catch (err) {
            console.log("에러 발생: ", err);
            dispatch({ type: "LOGGIN_FAILURE", payload: err.response.data });
            window.location.reload();
            console.log("로그인 안됨");
        }
    };

    return (
        <div className="authForm">
            <div className="authWrapper">
                <div className="pageTitle">LOGIN</div>
                <form>
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        className="authInput"
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
                    <button
                        type="submit"
                        className="authBtn1"
                        disabled={loading}
                        onClick={handleClick}
                    >
                        로그인
                    </button>
                    <Link to="/register">
                        <button type="button" className="authBtn2">
                            회원가입
                        </button>
                    </Link>
                </form>
                {error && alert(error.message)}
            </div>
        </div>
    );
};

export default Login;
