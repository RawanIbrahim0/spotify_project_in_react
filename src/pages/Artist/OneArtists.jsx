import { useLocation } from "react-router";
import { useEffect } from "react";
import ParticleBackground from "../../components/ParticleBackground";
import Sidebar from "../../components/Sidebar";
import Top20SongsSection from "./Top20Songs"; 

const OneArtists = () => {
  const location = useLocation();
  const artist =
    location.state?.artist || JSON.parse(localStorage.getItem("artistData"));

  if (!artist) {
    return <p>Not Found This Artist</p>;
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem("artistData");
    };
  }, []);

  const totalMinutes = artist.songs?.reduce((acc, song) => {
    return acc + song.msPlayed / 1000 / 60;
  }, 0).toFixed(2);

  const getSeason = (month) => {
    if (month === 12 || month === 1 || month === 2) return "Winter";
    if (month >= 3 && month <= 5) return "Spring";
    if (month >= 6 && month <= 8) return "Summer";
    return "Autumn";
  };

  const seasonCount = artist.songs.reduce((acc, song) => {
    const date = new Date(song.timestamp);
    const month = date.getMonth() + 1;
    const season = getSeason(month);
    acc[season] = (acc[season] || 0) + 1;
    return acc;
  }, {});

  const mostPlayedSeason =
    Object.keys(seasonCount).length > 0
      ? Object.entries(seasonCount).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )[0]
      : "No data";

  return (
    <div>
      {/* الشريط الجانبي */}
      <Sidebar />

      {/* الخلفية المتحركة */}
      <div className="relative min-h-screen">
        <ParticleBackground />

        {/* طبقة شفافة فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: "rgba(48, 52, 63, 0.5)", zIndex: 0 }}
        />

        {/* محتوى الصفحة */}
        <div className="relative z-10 p-10">
          {/* معلومات الفنان */}
          <section className="w-[80%] justify-self-end mb-6">
            <h2 className="text-3xl font-bold text-amber-50">{artist?.artist}</h2>
            <p>Number of songs: {artist?.songs.length}</p>
            <p>Total listening time: {totalMinutes} minutes</p>
            <p>Most listened season: {mostPlayedSeason}</p>
          </section>

          <Top20SongsSection songs={artist.songs} />

        </div>
      </div>
    </div>
  );
};

export default OneArtists;