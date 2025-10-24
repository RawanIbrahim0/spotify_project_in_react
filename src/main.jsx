import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route} from "react-router";

import './index.css'
import App from './App.jsx'
import TopArtists from './pages/Artist/TopArtists.jsx';
import OneArtists from './pages/Artist/OneArtists.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
        <Route path="/artist" element={<OneArtists />} />
     </Routes>
     </BrowserRouter>
  </StrictMode>,
)
