import axios from "axios";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import React, { useState, useContext } from "react";
import "./upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Upload = () => {
    const { user } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        title: "",
        fileurl: "",
        thumbimgUrl: "",
        desc: "",
    });
    const [file, setFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);
    const defaultImg = "musicimage.jpg";

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleThumbFileChange = (e) => {
        const file = e.target.files[0];
        setThumbFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCredentials((prev) => ({ ...prev, thumbimgUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const formData = new FormData();

    const handleClick = async (e) => {
        e.preventDefault();

        if (!credentials.title || !credentials.desc || !file || !thumbFile) {
            console.error("All fields are required.");
            return; // 필수 필드가 모두 채워져 있지 않으면 함수 종료
        }

        const formData = new FormData();
        formData.append("title", credentials.title);
        formData.append("desc", credentials.desc);
        formData.append("fileurl", file);
        formData.append("thumbimgUrl", thumbFile);

        try {
            const res = await axios.post(`${apiUrl}/musics`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload successful:", res.data);
        } catch (error) {
            console.error("Upload failed:", error.res ? error.res.data : error);
        }
    };

    return (
        <div className="pageWrapper">
            <Nav />
            <div className="uploadForm">
                <div className="uploadWrapper">
                    <div className="pageTitle">UPLOAD</div>
                    <form>
                        <div className="penIconbox">
                            <FontAwesomeIcon
                                icon={faPen}
                                className="penIcon"
                                onClick={() =>
                                    document
                                        .getElementById("imageInput")
                                        .click()
                                }
                                style={{
                                    color: "var(--c-white)",
                                    fontSize: "var(--s-medium)",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                        <div className="ImgeWrapper">
                            <img
                                src={credentials.thumbimgUrl || defaultImg}
                                alt={credentials.title}
                                className="thumbimgUrl"
                                onClick={() =>
                                    document
                                        .getElementById("thumbFileInput")
                                        .click()
                                }
                            />
                        </div>
                        <input
                            type="file"
                            id="thumbFileInput"
                            style={{ display: "none" }}
                            onChange={handleThumbFileChange}
                        />

                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            className="uploadInput"
                            autoComplete="off"
                            onChange={handleChange}
                            value={credentials.title}
                        />
                        <label htmlFor="fileurl">첨부파일 *</label>
                        <input
                            type="file"
                            id="fileurl"
                            className="uploadInput"
                            autoComplete="off"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="desc">설명 *</label>
                        <input
                            type="text"
                            id="desc"
                            className="uploadInput"
                            autoComplete="off"
                            onChange={handleChange}
                            value={credentials.desc}
                        />
                        <div className="btnBox">
                            <button
                                type="submit"
                                className="uploadBtn1"
                                onClick={handleClick}
                            >
                                업로드
                            </button>
                            <Link to="/">
                                <button type="button" className="uploadBtn1">
                                    취소
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Upload;
