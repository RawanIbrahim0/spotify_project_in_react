import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import ParticleBackground from "../../components/ParticleBackground"
import Sidebar from "../../components/Sidebar"
import Top20SongsSection from "./Top20Songs"
import AllAlbums from "./AllAlbums"

const OneArtist = () => {
  const [AllAlbum, setAllAlbums] = useState([])
  const location = useLocation()

  const artist =
    location.state?.artist || JSON.parse(localStorage.getItem("artistData"))

  if (!artist) {
    return <p>Not Found This Artist</p>
  }

  // تابع لتجميع الألبومات من الأغاني الخاصة بالمغني
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

    // نضيف كمان عدد الأغاني
    const formattedAlbums = Object.values(albumMap).map((album) => ({
      ...album,
      songCount: album.songs.length,
    }))

    return formattedAlbums
  }

  // حساب وقت الاستماع الكلي
  const totalMinutes = artist.songs
    ?.reduce((acc, song) => acc + song.msPlayed / 1000 / 60, 0)
    .toFixed(2)

  // تحديد الموسم الأكثر استماعًا
  const getSeason = (month) => {
    if (month === 12 || month === 1 || month === 2) return "Winter"
    if (month >= 3 && month <= 5) return "Spring"
    if (month >= 6 && month <= 8) return "Summer"
    return "Autumn"
  };

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
      {/* الشريط الجانبي */}
      <Sidebar />

      <div className="relative min-h-screen">
        <ParticleBackground />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: "rgba(30, 39, 73, 0.6)", zIndex: 0 }}
        />

        <div className="relative z-10 p-5">
          {/* معلومات الفنان */}
          <section className="w-[80%] justify-self-end mb-6">
            <div className="p-10 flex justify-between items-end w-full h-110 bg-[url(/assets/images/singer3.jpeg)] bg-no-repeat bg-cover rounded-xl">
              <h2 className="text-5xl font-bold text-amber-50">
                {artist?.artist}
              </h2>
              <div className="text-white flex justify-between items-center gap-12">
                <p>
                  <strong>Number of songs: </strong>
                  {artist?.songs.length}
                </p>
                <p>
                  <strong>Total listening time: </strong>
                  {totalMinutes} minutes
                </p>
                <p>
                  <strong>Most listened season: </strong>
                  {mostPlayedSeason}
                </p>
              </div>
            </div>
          </section>

          {/* قسم الألبومات */}
          <section className="w-[80%] h-[30%] justify-self-end p-3 mt-8">
            <AllAlbums albums={AllAlbum} />
          </section>

          {/* قسم أفضل 20 أغنية */}
          <Top20SongsSection songs={artist.songs} />
        </div>
      </div>
    </div>
  );
};

export default OneArtist;
