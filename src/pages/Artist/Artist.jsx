import { useEffect, useState } from "react";
import data from "../../assets/spotify_data_history.json";
import TopArtists from "./TopArtists";
import CardsArtist from "../../components/CardsArtist";
import { useNavigate } from "react-router";
import ParticleBackground from "../../components/ParticleBackground";


const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate();



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
    setVisibleCount((prev) => prev + 12);
  };

  const ToOnArtistPage = (artistObj) => {

    localStorage.setItem("artistData", JSON.stringify(artistObj));

    navigate("/artist", { state: { artist: artistObj } });
  }

  return (
    <div>
      {/*السايد بارالجانبي */}
      {/* <Sidebar /> */}
      {/* الخلفية المتحركة  */}
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(30, 39, 73, 0.6)",
            zIndex: 0
          }}
        />
        {/* محتوى الصفحة */}
        <div className="relative z-10 p-10">
          <div className="p-10 ">
            <section className="w-[80%] justify-self-end border-2 p-3 border-[#273469ff] rounded-xl">
              <h1 className="text-3xl font-bold flex justify-start items-center gap-2 mt-3 mb-2">
                <span className="text-white">All</span>
                <span className="text-[#8c61f9]">Artists</span>
              </h1>

              <div className="  h-[33vh]  overflow-y-auto custom-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {visibleArtists.map((artistObj, index) => (
                    <div key={index}>
                      <CardsArtist
                        index={index}
                        name={artistObj.artist}
                        onclick={() => ToOnArtistPage(artistObj)}
                      />
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

            <section className="w-[80%] justify-self-end border-2 p-3 border-[#273469ff] rounded-xl mt-8">
              <TopArtists artists={artists} />
            </section>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Artist;
