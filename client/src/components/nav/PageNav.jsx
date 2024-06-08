import "./pagenav.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCompactDisc,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PageNav = () => {
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
        <div className="pageNav">
            <div className="pageNavContainer">
                <div className="pageNavlogoIconBox">
                    <div className="pageNavlogoIcon" onClick={handleHomeBtn}>
                        <FontAwesomeIcon
                            icon={faCompactDisc}
                            style={{
                                color: "var(--c-white)",
                                fontSize: "var(--s-logo)",
                            }}
                        />
                    </div>
                    <span className="pageNavlogo" onClick={handleHomeBtn}>
                        M M L
                    </span>
                </div>
                <form className="pageNavsearchForm">
                    <div className="pageNavsearchContainer">
                        <div className="pageNavsearchIcon">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{
                                    color: "var(--c-dark-gray)",
                                    fontSize: "var(--s-medium)",
                                }}
                            />
                        </div>
                        <input
                            className="pageNavsearchInput"
                            name="searchInput"
                            type="text"
                            placeholder="Search for artists, bands, tracks, podcasts"
                        ></input>
                    </div>
                </form>
                <div className="pageNavItems">
                    {!user ? (
                        <>
                            <button className="pageNavBtn" onClick={handleLoginBtn}>
                                <div className="pageNavbtnText">
                                    <span>LOGIN</span>
                                </div>
                            </button>
                            <button
                                className="pageNavBtn"
                                onClick={handleRegisterBtn}
                            >
                                <div className="pageNavbtnText">
                                    <span>REGISTER</span>
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="pageNavBtn"
                                onClick={handleProfileBtn}
                            >
                                <div className="pageNavbtnText">
                                    <span>PROFILE</span>
                                </div>
                            </button>
                            <button className="pageNavBtn" onClick={handleLogoutBtn}>
                                <div className="pageNavbtnText">
                                    <span>LOGOUT</span>
                                </div>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageNav;
