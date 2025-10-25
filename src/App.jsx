import './App.css'
import Artist from './pages/Artist/Artist'
import OneArtist from './pages/Artist/OneArtists';
import TrendingMusic from './pages/TrendingMusic'
import { Routes, Route } from "react-router";
import Sidebar from './components/Sidebar'
import Register from './pages/Register';
import General from './pages/General';



function App() {

  return (
    <>
      <Sidebar />
      <div className="">
        <Routes>
          <Route path="/" element={<Artist />} />
          <Route path="/artist" element={<OneArtist />} />
          <Route path="/general" element={<Register />} />
          <Route path="/history" element={<TrendingMusic />} />
          <Route path="/allArtist" element={<Artist />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}

export default App
