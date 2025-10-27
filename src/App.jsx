import "./App.css";
import { useState, useEffect } from "react";
import Artist from "./pages/Artist/Artist";
import OneArtist from "./pages/Artist/OneArtists";
import TrendingMusic from "./pages/TrendingMusic";
import { Routes, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import General from "./pages/General";
import NavBar from "./components/NavBar";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import ParticleBackground from './components/ParticleBackground'
import MusicPlayer from './pages/MusicPlayer'



function App() {
  const [userData, setUserData] = useState(null);

  // جلب بيانات المستخدم من localStorage عند تحميل التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <>
      {/* <ParticleBackground/> */}
      <NavBar userData={userData} onLogout={handleLogout} />
      <Sidebar />
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artist" element={<OneArtist />} />
          <Route path="/history" element={<TrendingMusic />} />
          <Route path="/allArtist" element={<Artist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/general" element={<General />} />
          <Route path="/music_player" element={<MusicPlayer />} />
          <Route
            path="/register"
            element={<Register setUserData={setUserData} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
