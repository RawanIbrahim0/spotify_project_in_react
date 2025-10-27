import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router"


const SongCardT = ({
  rank,
  title,
  artist,
  releaseDate,
  album,
  time,
  coverUrl,
}) => {
    const navigate = useNavigate()

  const ToOnArtistPage = () => {
    navigate("/music_player")
  }
  return (
    <div 
    onClick={ToOnArtistPage}
    className="flex items-center justify-between bg-[#273469] p-5 rounded-lg hover:bg-[#30343f] transition-colors duration-200">
      <div className="w-10 text-2xl font-bold text-[#e4d9ff]">#{rank}</div>

      <div className="flex-1 flex items-center space-x-5 min-w-0">
        <img
          src={coverUrl}
          alt={`Album cover for ${title}`}
          className="w-16 h-16 rounded-md object-cover "
        />
        <div className="min-w-0">
          <p className="text-xl font-semibold text-[#fafaff] truncate">
            {title}
          </p>

          <p className="text-base text-[#e4d9ff]/70 truncate">{artist}</p>
        </div>
      </div>

      <div className="w-32 hidden md:block text-[#fafaff] text-base">
        {releaseDate}
      </div>

      <div className="w-64 hidden lg:block text-[#fafaff] text-base truncate">
        {album}
      </div>

      <div className="w-32 flex items-center justify-end space-x-4">
        <span className="text-base text-[#fafaff]">{time}</span>
        <button
          className="text-[#e4d9ff] hover:text-pink-500 transition-colors"
          aria-label={`Like ${title}`}
        >
          <FaHeart size={22} />
        </button>
      </div>
    </div>
  );
};

export default SongCardT;
