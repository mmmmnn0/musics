import Nav from "../../components/nav/Nav.jsx";
import HSearch from "../../components/hsearch/HSearch.jsx";
import Footer from "../../components/footer/Footer.jsx";
import MusicList from "../../components/musiclist/MusicList.jsx";
import "./home.css";

const Home = () => {
    return (
        <div className="homeWholeWrapper">
            <Nav />
            <div className="homewrapper">
                <div className="hsearchContainer">
                    <HSearch />
                </div>
                <div className="homeContents">
                    <MusicList />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
