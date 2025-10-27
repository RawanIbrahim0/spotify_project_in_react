import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import ParticleBackground from "../../components/ParticleBackground"
import Top20SongsSection from "./Top20Songs"
import AllAlbums from "./AllAlbums"
import AllSongs from "./AllSongs"

const OneArtist = () => {
  const [AllAlbum, setAllAlbums] = useState([])
  const location = useLocation()

  const artist = location.state?.artist || JSON.parse(localStorage.getItem("artistData"))
  const totalAllMinutesAllSongs = location.state?.totalMinutes || 0



  if (!artist) {
    return <p>Not Found This Artist</p>
  }

  const getAllAlbums = (songs, artistName) => {
    const albumMap = {}

    songs.forEach((song) => {
      const { albumName, songName } = song
      if (albumName && songName) {
        if (!albumMap[albumName]) {
          albumMap[albumName] = {
            albumName,
            artistName,
            songs: [],
          }
        }

        if (!albumMap[albumName].songs.includes(songName)) {
          albumMap[albumName].songs.push(songName)
        }
      }
    })

    const formattedAlbums = Object.values(albumMap).map((album) => ({
      ...album,
      songCount: album.songs.length,
    }))

    return formattedAlbums
  }

  const totalMinutes = artist.songs
    ?.reduce((acc, song) => acc + song.msPlayed / 1000 / 60, 0)
    .toFixed(2)

  const percentage = ((totalMinutes / totalAllMinutesAllSongs) * 100).toFixed(2)
  console.log("Percentage:", percentage, "%")

  const getSeason = (month) => {
    if (month === 12 || month === 1 || month === 2) return "Winter"
    if (month >= 3 && month <= 5) return "Spring"
    if (month >= 6 && month <= 8) return "Summer"
    return "Autumn"
  }

  const seasonCount = artist.songs.reduce((acc, song) => {
    const date = new Date(song.timestamp)
    const month = date.getMonth() + 1
    const season = getSeason(month)
    acc[season] = (acc[season] || 0) + 1
    return acc
  }, {})

  const mostPlayedSeason =
    Object.keys(seasonCount).length > 0
      ? Object.entries(seasonCount).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0]
      : "No data"

  useEffect(() => {
    const albums = getAllAlbums(artist.songs, artist.artist)
    setAllAlbums(albums)

    return () => {
      localStorage.removeItem("artistData")
    }
  }, [])

  return (
    <div>
      <div className="relative min-h-screen">
        <ParticleBackground />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: "rgba(30, 39, 73, 0.6)", zIndex: 0 }}
        />

        <div className="relative z-100 p-5 w-[80%] justify-self-end">
          {/* معلومات الفنان */}
          <section className=" mb-6">
            <div className="p-10 flex justify-between items-end w-full h-110 bg-[url(/assets/images/sss.jpeg)] bg-no-repeat bg-cover rounded-xl">
              <h2 className="text-5xl font-bold text-amber-50">
                {artist?.artist}
              </h2>
              <div className="text-xl text-white flex justify-between items-center gap-8">
                <p>
                 Number of songs: 
                   <strong className="text-white text-3xl"> {artist?.songs.length}</strong>
                </p>
                <p>
                  Listening time:
                  <strong className="text-white text-xl"> {totalMinutes} min </strong>
                </p>
                 <p>
                  Percent of Listening: 
                  <strong className="text-white text-xl"> {percentage} % </strong>
                </p>
                <p>
                  Most Listened Season:  
                  <strong  className="text-white text-xl"> {mostPlayedSeason}</strong>
                </p>
              </div>
            </div>
          </section>

          {/*كل الأغاني */}
          <section className="mb-6 p-3">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-white">All</span>
              <span className="text-[#8c61f9]">Songs</span>
            </h1>
            <AllSongs artist={artist} />
          </section>

          {/* قسم الألبومات */}
          <section className=" h-[30%] p-3 mt-8">
            <AllAlbums albums={AllAlbum} />
          </section>

          {/* قسم أفضل 20 أغنية */}
          <Top20SongsSection songs={artist.songs} />
        </div>
      </div>
    </div>
  );
};

export default OneArtist