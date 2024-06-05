import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    // const location = useLocation();
    // console.log("location : ", location);
    const [destination, setDestination] = useState(location.state.destination);

    const handleInputChange = (event) => {
        setDestination(event.target.value);
    };

    const apiUrl = process.env.REACT_APP_API_URL;
    const { data, loading, error, reFetch } = useFetch(
        `${apiUrl}/musics?random&min=${min || 0}&max=${max || 999}`
    );

    const handleClick = () => {
        reFetch();
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input
                                placeholder={destination}
                                onChange={handleInputChange}
                                type="text"
                            />
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "Loading..."
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item.id} />
                                ))}
                            </>
                        )}

                        {/* {data.map((item, ) => (
                            <div className="mpItem" key={item._id}>
                                <img
                                    src={item.thumbimgUrl[0]}
                                    alt=""
                                    className="mpImg"
                                />
                                <span className="mpTitle">{item.title}</span>
                                <span className="mpUploader">
                                    {item.uploader
                                        ? item.uploader.username
                                        : "Unknown Uploader"}
                                </span>
                                <span>{`조회수 ${item.views}회`}</span>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
