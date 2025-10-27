import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router";

import './index.css'
import App from './App.jsx'
import OneArtists from './pages/Artist/OneArtists.jsx';
import TrendingMusic from './pages/TrendingMusic.jsx';
import Artist from './pages/Artist/Artist.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <App/>
     </BrowserRouter>
  </StrictMode>
)
