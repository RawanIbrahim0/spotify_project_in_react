import SongCardT from "./SongCardT";
import { useNavigate } from "react-router";


const songsData = [
  {
    rank: 1,
    title: "Sorfcors",
    artist: "The neighborhood",
    releaseDate: "Nov 4, 2023",
    album: "Hard to Imagine the Neighbourhood Ever Changing",
    time: "3:26",
    coverUrl:"/assets/images/song1.png",
  },
  {
    rank: 2,
    title: "Skyfall Beats",
    artist: "nightmares",
    releaseDate: "Oct 26, 2023",
    album: "nightmares",
    time: "2:45",
    coverUrl:"/assets/images/song2.png",
  },
  {
    rank: 3,
    title: "Greedy",
    artist: "tate mcrae",
    releaseDate: "Dec 30, 2023",
    album: "Greedy",
    time: "2:11",
    coverUrl:"/assets/images/song3.png",
  },
];

const TrendingSongs = () => {
  const topThreeSongs = songsData.slice(0, 3);

    const navigate = useNavigate();

  const ToOnArtistPage = (artistObj) => {

    navigate("/history");
  };

  return (
    <div className=" p-6 shadow-2xl ">
      <h2 className="text-4xl font-bold mb-4 text-[#273469]">
        Top Songs <span className="text-[#4e4760]"></span>
      </h2>

      <div className="flex items-center justify-between p-3 mb-2 border-b border-[#30343f] text-[#273469]/90 text-s uppercase font-medium tracking-wider">
        <div className="w-10 font-bold">#</div>
        <div className="flex-1 font-bold">Title</div>
        <div className="w-32 hidden md:block font-bold">Release Date</div>
        <div className="w-64 hidden lg:block font-bold">Album</div>
        <div className="w-32 text-right font-bold">Time</div>
      </div>

      <div className="space-y-2">
        {topThreeSongs.map((song) => (
          <SongCardT
            key={song.rank}
            rank={song.rank}
            title={song.title}
            artist={song.artist}
            releaseDate={song.releaseDate}
            album={song.album}
            time={song.time}
            coverUrl={song.coverUrl}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={ToOnArtistPage}
          className="flex items-center space-x-2 px-6 py-3 bg-[#273469] text-[#e4d9ff] rounded-full font-semibold hover:bg-[#30343f]/80 transition-colors shadow-lg"
        >
          <span>View All</span>
        </button>
      </div>
    </div>
  );
};

export default TrendingSongs;