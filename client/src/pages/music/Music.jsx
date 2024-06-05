import "./music.css";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faRetweet,
    faShareSquare,
    faBars,
    faEllipsisH,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PageNav from "../../components/nav/PageNav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Comment from "../../components/comment/Comment.jsx";
import { useParams } from "react-router-dom";

const Music = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [music, setMusic] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [liked, setLiked] = useState(false);

    const defaultImg = "path/to/musicimage.jpg"; // 기본 이미지 경로 설정

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/musics/${id}`
                );
                setMusic(response.data);
                setIsLoaded(true);
                console.log("Music file URL:", response.data.fileurl);
            } catch (error) {
                console.error("Error fetching music data:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/musics/${id}/comments`
                );
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchMusicData();
        fetchComments();
    }, [id]);

    const handleButtonClick = (e) => {
        e.target.classList.toggle("active");
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const backgroundImage = music.thumbimgUrl || defaultImg;

    console.log("backgroundImage :", backgroundImage);
    return (
        <div>
            <PageNav />
            <div className="musicWrapper">
                <div
                    className="musicShow"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="musicPlay">
                        <div className="playerContainer">
                            <audio
                                className="audioCurrent"
                                controls
                                controlsList="nodownload"
                                src={`${process.env.REACT_APP_API_URL}/${music.fileurl}`}
                            ></audio>
                        </div>
                    </div>
                    <div className="musicInfo">
                        <h2 className="musicTitle">{music.title}</h2>
                        <h2 className="musicUploader">
                            {music.uploader.username}
                        </h2>
                    </div>
                </div>

                <div className="musicComments">
                    <div className="musicCommentsContainer">
                        <div className="musicCommentsBox">
                            <div className="musicBtnBox">
                                <button className="musicBtn" id="mb1">
                                    <FontAwesomeIcon
                                        className="heartIcon"
                                        onClick={handleButtonClick}
                                        icon={faHeart}
                                    />
                                </button>
                                <button className="musicBtn" id="mb2">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faRetweet}
                                    />
                                    Repost
                                </button>
                                <button className="musicBtn" id="mb3">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faShareSquare}
                                    />
                                    Share
                                </button>
                                <button className="musicBtn" id="mb4">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faBars}
                                    />
                                    Add to Next up
                                </button>
                                <div className="moreDropdown">
                                    <button className="musicBtn" id="mb5">
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faEllipsisH}
                                        />
                                        More
                                    </button>
                                </div>
                            </div>

                            <div className="musicStatsBox">
                                <div className="musicStats">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faPlay}
                                    />
                                    <p>100</p>
                                </div>
                                <div className="musicStats">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faHeart}
                                    />
                                    <p>700</p>
                                </div>
                                <div className="musicStats">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faRetweet}
                                    />
                                    <p>200</p>
                                </div>
                            </div>
                        </div>
                        <div className="CommentsIndex"></div>
                    </div>
                    <div className="DescComments">
                        {comments &&
                            comments.map((comment) => (
                                <Comment
                                    comment={comment}
                                    key={comment._id}
                                    user={user}
                                    musicid={music._id}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Music;
