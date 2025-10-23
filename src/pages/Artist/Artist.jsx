import { useEffect, useState } from "react";
import data from "../../assets/spotify_data_history.json";
import TopArtists from "./TopArtists";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (Array.isArray(data)) {
     
      const artistSongs = data.reduce((acc, e) => {
        const artistName = e.master_metadata_album_artist_name;
        const songName = e.master_metadata_track_name;
        const albumName = e.master_metadata_album_album_name;
        const timestamp = e.ts;
        const msPlayed = e.ms_played;
        const reasonStart = e.reason_start;
        const reasonEnd = e.reason_end;
        const shuffle = e.shuffle;
        const skipped = e.skipped;

        if (artistName && songName) {
          if (!acc[artistName]) {
            acc[artistName] = [];
          }

          acc[artistName].push({
            songName,
            albumName,
            artistName,
            timestamp,
            msPlayed,
            reasonStart,
            reasonEnd,
            shuffle,
            skipped,
          });
        }
        return acc;
      }, {});

    
      const artistArray = Object.entries(artistSongs).map(([artist, songs]) => ({
        artist,
        songs,
      }));

      setArtists(artistArray);
    }
  }, []);

  const visibleArtists = artists.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="p-10 ">
      <section className="w-[80%] justify-self-end">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
        <span className="text-white">All</span>
        <span className="text-[#8c61f9]">Artists</span>
      </h1>
      <div className="  h-[50vh]  overflow-y-auto custom-scroll">


      <h2 className="font-bold text-white">Total: {data.length}</h2>
      <h2 className="font-bold text-white">Unique Artists: {artists.length}</h2>

      <div>
        {visibleArtists.map((artistObj, index) => (
          <div key={index}>
            <h2>{artistObj.artist}</h2>
          </div>
        ))}
      </div>
      </div>
        {visibleCount < artists.length && (
        <button
          onClick={handleViewMore}
          className="bg-[#8c61f9] text-white px-4 py-2 mt-4 rounded hover:bg-[#7a4ff0]"
        >
          View More
        </button>
      )}
      </section>

      <section className="w-[80%] justify-self-end">
        <TopArtists artists={artists}/>
      </section>
    </div>
  );
};

export default Artist;
