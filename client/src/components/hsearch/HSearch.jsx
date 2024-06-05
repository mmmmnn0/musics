import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowUpFromBracket,
    faLinesLeaning,
} from "@fortawesome/free-solid-svg-icons";
import "./hsearch.css";

const HSearch = () => {
    return (
        <div className="hsearch">
            <form className="searchForm">
                <div className="searchContainer">
                    <div className="searchIcon">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{
                                color: "var(--c-dark-gray)",
                                fontSize: "var(--s-medium)",
                            }}
                        />
                    </div>
                    <input
                        className="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Search for artists, bands, tracks, podcasts"
                    ></input>
                </div>
            </form>
            <div className="hsearchBtnBox">
                <a className="hsearchBtn" href="/upload">
                    <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        className="hsearchBtnIcon"
                    />
                    UPLOAD
                </a>
                <a className="hsearchBtn" href="/library">
                    <FontAwesomeIcon
                        icon={faLinesLeaning}
                        className="hsearchBtnIcon"
                    />
                    LIBRARY
                </a>
            </div>
        </div>
    );
};

export default HSearch;
