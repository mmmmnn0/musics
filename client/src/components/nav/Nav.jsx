import "./nav.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Nav = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleHomeBtn = () => {
        navigate("/");
    };

    const handleRegisterBtn = () => {
        navigate("/register");
    };

    const handleLoginBtn = () => {
        navigate("/login");
    };

    const handleLogoutBtn = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(
                `${apiUrl}/auth/logout`,
                {},
                { withCredentials: true }
            );
            dispatch({ type: "LOGOUT" });
            navigate("/");
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleProfileBtn = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/profile");
        }
    };

    return (
        <div className="nav">
            <div className="navContainer">
                <div className="logoIconBox">
                    <div className="logoIcon" onClick={handleHomeBtn}>
                        <FontAwesomeIcon
                            icon={faCompactDisc}
                            style={{
                                color: "var(--c-white)",
                                fontSize: "var(--s-logo)",
                            }}
                        />
                    </div>
                </div>
                <span className="logo" onClick={handleHomeBtn}>
                    M M L
                </span>
                <div className="navItems">
                    {!user ? (
                        <>
                            <a className="navBtn" onClick={handleLoginBtn}>
                                <div className="btnText">
                                    <span>LOGIN</span>
                                </div>
                            </a>
                            <a className="navBtn" onClick={handleRegisterBtn}>
                                <div className="btnText">
                                    <span>REGISTER</span>
                                </div>
                            </a>
                        </>
                    ) : (
                        <>
                            <a className="navBtn" onClick={handleProfileBtn}>
                                <div className="btnText">
                                    <span>PROFILE</span>
                                </div>
                            </a>
                            <a className="navBtn" onClick={handleLogoutBtn}>
                                <div className="btnText">
                                    <span>LOGOUT</span>
                                </div>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nav;
