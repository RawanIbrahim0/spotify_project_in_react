import React, { useState } from "react";
import data from "../assets/spotify_data_history.json";
import SongCardT from "../components/SongCardT";
import ParticleBackground from "../components/ParticleBackground";

const General = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [isFiltered, setIsFiltered] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // رقم الصفحة (0 يعني أول 20)
  const pageSize = 20;

  const handleFilter = () => {
    if (!isFiltered) {
      const uniqueSongs = [];
      const seen = new Set();

      data.forEach((song) => {
        const key = song.master_metadata_track_name?.toLowerCase().trim();
        if (key && !seen.has(key)) {
          seen.add(key);
          uniqueSongs.push(song);
        }
      });

      setFilteredData(uniqueSongs);
      setIsFiltered(true);
    } else {
      setFilteredData(data);
      setIsFiltered(false);
    }
    setPageIndex(0); // بعد التصفية أو العودة نرجع للصفحة الأولى
  };

  const handleNextPage = () => {
    const maxPage = Math.floor((filteredData.length - 1) / pageSize);
    if (pageIndex < maxPage) {
      setPageIndex(pageIndex + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const displayedSongs = filteredData.slice(start, end);

  return (
    <div>
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(30, 39, 73, 0.6)",
            zIndex: 0,
          }}
        />
        <div className="relative z-100 w-[80%] ml-auto flex flex-col p-20 gap-4 min-h-screen text-[#fafaff]">
          <div className="flex items-center gap-6 mb-6 ">
            <img
              src="/assets/img/back.jpg"
              alt="Trending Mix"
              className="w-40 h-40 rounded-xl shadow-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">
                Trending songs <span className="text-[#8c61f9]">mix</span>
              </h1>
              <p className="text-[#e4d9ff] mt-1 text-sm">
                From your listening history – a mix of artists you love 🎶
              </p>
              <p className="text-[#e4d9ff]/70 mt-1 text-xl">
                {filteredData.length} songs • auto-generated from Spotify data
              </p>

              <button
                onClick={handleFilter}
                className="mt-4 px-5 py-2 bg-[#8c61f9] hover:bg-[#7a51e6] text-white font-semibold rounded-full shadow-md transition-all"
              >
                {isFiltered ? "Show All Songs" : "Show Unique Songs"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl">
            {displayedSongs.map((song, index) => (
              <SongCardT
                key={start + index}
                rank={start + index + 1}
                title={song.master_metadata_track_name || "Unknown Title"}
                artist={song.master_metadata_album_artist_name || "Unknown Artist"}
                releaseDate={new Date(song.ts).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                album={song.master_metadata_album_album_name || "Unknown Album"}
                time={`${Math.floor(song.ms_played / 60000)}:${String(
                  Math.floor((song.ms_played % 60000) / 1000)
                ).padStart(2, "0")}`}
                coverUrl="assets/images/albumCover.jpg"
              />
            ))}
          </div>

          <div className="mt-6 mx-auto flex gap-4">
            <button
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
              className="px-5 py-2 bg-[#8c61f9] hover:bg-[#7a51e6] text-white font-semibold rounded-full shadow-md transition-all disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={(pageIndex + 1) * pageSize >= filteredData.length}
              className="px-5 py-2 bg-[#8c61f9] hover:bg-[#7a51e6] text-white font-semibold rounded-full shadow-md transition-all disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default General;
