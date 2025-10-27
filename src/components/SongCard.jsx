import { FaHeart } from 'react-icons/fa'
import { useNavigate } from "react-router"

const SongCard = ({ rank, title, artist, releaseDate, album, time, coverUrl, index }) => {
  const imageNumber = (index % 20) + 1
  const imagePath = `/assets/images/m${imageNumber}.jpeg`

  const navigate = useNavigate()

  const ToOnArtistPage = () => {
    navigate("/music_player")
  }


  return (
    <div
    onClick={ToOnArtistPage}
    className="flex items-center justify-between p-5 rounded-lg hover:bg-[#273469ff] transition-colors duration-200">

      <div className="w-10 text-2xl font-bold text-periwinkle">
        #{rank}
      </div>

      <div className="flex-1 flex items-center space-x-5 min-w-0">
        <img
          src={imagePath}
          alt="artist"
          className="ml-7 w-[16%] h-[16%] rounded-xl" />

        <div className="min-w-0">
          <p className="text-xl font-semibold text-ghost-white truncate">{title}</p>
          <p className="text-base text-periwinkle/70 truncate">{artist}</p>
        </div>
      </div>

      <div className="w-32 hidden md:block text-ghost-white text-base">
        {new Date(releaseDate).toLocaleDateString()}
      </div>

      <div className="w-64 hidden lg:block text-ghost-white text-base truncate">
        {album}
      </div>

      <div className="w-32 flex items-center justify-end space-x-4">
        <span className="text-base text-ghost-white">{time}</span>
        <button
          className="text-periwinkle hover:text-primary transition-colors"
          aria-label={`Like ${title}`}
        >
          <FaHeart size={22} />
        </button>
      </div>
    </div>
  )
}

export default SongCard
