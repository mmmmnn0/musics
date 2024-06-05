import "./musiclist.css";
import useFetch from "../../hooks/useFetch";
import React from "react";
import { useNavigate } from "react-router-dom";

const MusicList = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { data, loading, error } = useFetch(`${apiUrl}/musics?limit=6`);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    const defaultImg = "musicimage.jpg";

    const handleMusicBtn = (id) => {
        navigate(`/musics/${id}`);
    };

    return (
        <div className="mp">
            {data.map((item, index) => (
                <div
                    className="mpItem"
                    key={index}
                    onClick={() => handleMusicBtn(item._id)}
                >
                    <div className="mpImageWrapper">
                        <img
                            src={item.thumbimgUrl[0] || defaultImg}
                            alt={item.title}
                            className="mpImg"
                            onError={(e) => (e.target.src = defaultImg)}
                        />
                    </div>
                    <span className="mpTitle">{item.title}</span>
                    <span className="mpUploader">
                        {item.uploader
                            ? item.uploader.username
                            : "Unknown Uploader"}
                    </span>
                    <span>{`조회수 ${item.views}회`}</span>
                </div>
            ))}
        </div>
    );
};

export default MusicList;
