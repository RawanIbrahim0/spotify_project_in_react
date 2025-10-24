import { useLocation } from "react-router";
import { useEffect } from "react";
import ParticleBackground from "../../components/ParticleBackground";
import Sidebar from "../../components/Sidebar";


const OneArtists = () => {

  const location = useLocation();
  const artist =
    location.state?.artist ||
    JSON.parse(localStorage.getItem("artistData"));

  if (!artist) {
    return <p>Not Found This Artist</p>;
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem("artistData");
    };
  }, []);

  return (
    <div>
      {/*السايد بارالجانبي */}
      <Sidebar />
      {/* الخلفية المتحركة  */}
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(48, 52, 63, 0.5)",
            zIndex: 0
          }}
        />
        {/* محتوى الصفحة */}
        <div className="relative z-10 p-10">
          <section className="w-[80%]  justify-self-end ">
            <h2 className="text-3xl font-bold text-amber-50">{artist?.artist}</h2>
            <p>number of songs:  {artist?.songs.length}</p>

            {artist?.songs.length > 0 && (
              <p>أول أغنية: {artist.songs[0].songName}</p>
            )}
          </section>
        </div>
      </div>
    </div>

  );
}

export default OneArtists
