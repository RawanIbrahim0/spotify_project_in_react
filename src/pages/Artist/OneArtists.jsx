import { useLocation } from "react-router";
import { useEffect } from "react";


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
    <div className="text-white">
      <h2 className="text-3xl font-bold text-amber-50">{artist?.artist}</h2>
      <p>number of songs:  {artist?.songs.length}</p>

      {artist?.songs.length > 0 && (
        <p>أول أغنية: {artist.songs[0].songName}</p>
      )}
    </div>
  );
}

export default OneArtists
