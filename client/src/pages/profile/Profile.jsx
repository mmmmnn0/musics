import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import EditPw from "./EditPw";
import "./profile.css";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const {
        data: userData,
        loading,
        error,
    } = useFetch(`${apiUrl}/users/${user._id}`);

    const [credentials, setCredentials] = useState({
        profileimg: "",
        password: "",
        username: "",
        phone: "",
        nickname: "",
        bio: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    useEffect(() => {
        if (userData) {
            setCredentials(userData);
        }
    }, [userData]);

    console.log("credentials.profileimg : ", credentials.profileimg);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCredentials((prev) => ({ ...prev, profileimg: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    if (loading) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>error : {error.message}</div>;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("profileimg", credentials.profileimg);
            formData.append("nickname", credentials.nickname);
            formData.append("password", credentials.password);
            formData.append("phone", credentials.phone);
            formData.append("bio", credentials.bio);
            if (imageFile) {
                formData.append("profile", imageFile);

                console.log("imageFile : ", imageFile);
            }
            const res = await axios.put(
                `${apiUrl}/users/${user._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const newImgUrl = `${apiUrl}/${
                res.data.profileimg
            }?${new Date().getTime()}`;
            setCredentials((prev) => ({ ...prev, profileimg: newImgUrl }));
            console.log("res.data : ", res.data);

            window.location.href = "/profile";
            console.log("newImgUrl : ", newImgUrl);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="profilewrapper">
            <form className="profileForm">
                <div className="pageTitle">MY PAGE</div>
                <div className="penIconbox">
                    <FontAwesomeIcon
                        icon={faPen}
                        className="penIcon"
                        onClick={() =>
                            document.getElementById("imageInput").click()
                        }
                        style={{
                            color: "var(--c-white)",
                            fontSize: "var(--s-medium)",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div className="ImgeWrapper">
                    {credentials.profileimg &&
                    credentials.profileimg.length > 0 ? (
                        <img
                            src={credentials.profileimg}
                            alt="profile"
                            className="profileimg"
                            onClick={() =>
                                document.getElementById("imageInput").click()
                            }
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faUser}
                            size="5x"
                            style={{
                                color: "var(--c-white)",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                document.getElementById("imageInput").click()
                            }
                        />
                    )}
                </div>
                <input
                    type="file"
                    id="imageInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />

                {credentials.nickname ? (
                    <div className="nicknametext">{credentials.nickname}</div>
                ) : (
                    <div className="nicknametext">{credentials.username}</div>
                )}
                <label className="profileLabel" htmlFor="username">
                    아이디
                </label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={credentials.username}
                    readOnly
                />
                <span className="notChangeable">
                    {" "}
                    아이디는 변경이 불가합니다.{" "}
                </span>
                <br />
                <br />
                <label className="profileLabel" htmlFor="nickname">
                    닉네임
                </label>
                <input
                    type="text"
                    id="nickname"
                    autoComplete="off"
                    onChange={handleChange}
                    value={credentials.nickname}
                />
                <label className="profileLabel" htmlFor="editPassword">
                    비밀번호
                </label>
                <button
                    type="button"
                    id="editPassword"
                    className="editPassword"
                    placeholder="비밀번호 변경하기"
                    onClick={() => setShowPasswordForm(true)}
                >
                    비밀번호 변경하기
                </button>
                <label className="profileLabel" htmlFor="phone">
                    전화번호
                </label>
                <input
                    type="text"
                    id="phone"
                    autoComplete="off"
                    onChange={handleChange}
                    value={credentials.phone}
                />
                <label className="profileLabel" htmlFor="bio">
                    소개
                </label>
                <input
                    type="text"
                    id="bio"
                    autoComplete="off"
                    onChange={handleChange}
                    value={credentials.bio}
                />
                <button className="profileBtn" onClick={handleClick}>
                    수정
                </button>
                <Link to="/">
                    <button className="profileBtn" type="button">
                        HOME
                    </button>
                </Link>
            </form>

            {showPasswordForm && (
                <EditPw
                    user={user}
                    apiUrl={apiUrl}
                    setShowPasswordForm={setShowPasswordForm}
                />
            )}
        </div>
    );
};

export default Profile;
