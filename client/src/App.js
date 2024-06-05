import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Music from "./pages/music/Music.jsx";
import Upload from "./pages/upload/Upload.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/musics/:id" element={<Music />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
