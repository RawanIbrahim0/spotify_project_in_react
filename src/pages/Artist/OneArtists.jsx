import { useLocation } from "react-router";

const OneArtists = () => {
  const location = useLocation();
  const artist = location.state?.artist;
  console.log("aaaaaaaa : "+artist)
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">{artist?.artist}</h1>
      <p>عدد الأغاني: {artist?.songs.length}</p>

      {artist?.songs.length > 0 && (
        <p>أول أغنية: {artist.songs[0].songName}</p>
      )}
    </div>
  );
}

export default OneArtists
