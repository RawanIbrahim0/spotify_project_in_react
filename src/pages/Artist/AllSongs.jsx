import { useState } from 'react'
import { useNavigate } from "react-router"


const AllSongs = ({ artist }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [visibleUniqueCount, setVisibleUniqueCount] = useState(10);
  const [showUnique, setShowUnique] = useState(false)

  const allSongs = artist.songs;
  const visibleSongs = allSongs.slice(0, visibleCount);

  const uniqueSongs = Array.from(
    new Map(allSongs.map((song) => [song.songName, song])).values()
  );
  const visibleUniqueSongs = uniqueSongs.slice(0, visibleUniqueCount);


  const tableStyle =
    "h-[60vh] overflow-y-auto custom-scroll border border-[#8c61f9] p-4 rounded-xl shadow-[0_0_10px_#8c61f940] bg-[#05052e]";


  const currentSongs = showUnique ? visibleUniqueSongs : visibleSongs;


  const getImage = (index) => {
    const imageNumber = (index % 20) + 1;
    return `/assets/images/m${imageNumber}.jpeg`;
  };

const navigate = useNavigate()

  const ToOnArtistPage = () => {
    navigate("/music_player")
  }

  return (
    <div>

      {/* أزرار التبديل */}
      <div className="text-white mb-6 mt-6 flex gap-4">
        <button
          className={`p-2 rounded-2xl transition-all ${!showUnique
            ? "bg-[#8c61f9] scale-105"
            : "bg-[#05052e] hover:scale-98"
            }`}
          onClick={() => setShowUnique(false)}
        >
          All / With Repeat
        </button>

        <button
          className={`p-2 rounded-2xl transition-all ${showUnique
            ? "bg-[#8c61f9] scale-105"
            : "bg-[#05052e] hover:scale-98"
            }`}
          onClick={() => setShowUnique(true)}
        >
          Unique / Without Repeat
        </button>
      </div>

      {/* جدول ثابت */}
      <div className={tableStyle}>
        <table className="w-full border-collapse text-xl">
          <thead className="sticky top-0 bg-[#1a1a22] text-[#cfc4ff] uppercase text-xs tracking-wide">
            <tr>
              <th className="p-3 text-left border-b border-[#7a4ff040] w-12">
                #
              </th>
              <th className="p-3 text-left border-b border-[#7a4ff040] w-12">
                image
              </th>
              <th className="p-3 text-left border-b border-[#7a4ff040]">
                Song Name
              </th>
              <th className="p-3 text-left border-b border-[#7a4ff040]">
                Song Date
              </th>
              <th className="p-3 text-left border-b border-[#7a4ff040]">
                Album
              </th>
              <th className="p-3 text-left border-b border-[#7a4ff040]">
                Song Played
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song, index) => (
              <tr
                onClick={ToOnArtistPage}
                key={index}
                className="hover:bg-[#7a4ff015] transition-colors duration-200 border-b border-[#25164f15]"
              >
                <td className="w-[10%] border-b p-3 text-[#a88cff] font-medium">
                  {index + 1}
                </td>
                <td className="w-[10%] border-b p-3 text-[#a88cff] font-medium">
                  <img
                    src={getImage(index)}
                    alt="artist"
                    className="w-[70%] h-[70%] rounded-xl" />
                </td>
                <td className="w-[20%] p-3 border-b text-white">
                  {song.songName}
                </td>
                <td className="p-3 border-b text-white">{song.timestamp}</td>
                <td className="p-3 border-b text-white">{song.albumName}</td>
                <td className="p-3 border-b text-white">{song.msPlayed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* أزرار العرض */}
      <div className="flex gap-4 mt-4">
        {(!showUnique && visibleCount < allSongs.length) ||
          (showUnique && visibleUniqueCount < uniqueSongs.length) ? (
          <button
            onClick={() => {
              if (showUnique) {
                setVisibleUniqueCount((prev) =>
                  Math.min(prev + 20, uniqueSongs.length)
                );
              } else {
                setVisibleCount((prev) => Math.min(prev + 20, allSongs.length));
              }
            }}
            className="bg-[#8c61f9] text-white px-4 py-2 rounded hover:bg-[#7a4ff0]"
          >
            View More
          </button>
        ) : null}

        {(!showUnique && visibleCount > 10) ||
          (showUnique && visibleUniqueCount > 10) ? (
          <button
            onClick={() => {
              if (showUnique) {
                setVisibleUniqueCount((prev) => Math.max(prev - 20, 10));
              } else {
                setVisibleCount((prev) => Math.max(prev - 20, 10));
              }
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            View Less
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AllSongs