import { useEffect, useState } from "react"
import data from "../../assets/spotify_data_history.json"
import TopArtists from "./TopArtists"
import CardsArtist from "../../components/CardsArtist"
import { useNavigate } from "react-router"
import ParticleBackground from "../../components/ParticleBackground"
import AllAlbums from "./AllAlbums"
import Sidebar from "../../components/Sidebar"


const Artist = () => {
  const [artists, setArtists] = useState([])
  const [AllAlbum, setAllAlbums] = useState([])

  const [visibleCount, setVisibleCount] = useState(12)

  const [totalMinutes, setTotalMinutes] = useState(0);


  const navigate = useNavigate()



  useEffect(() => {
    if (Array.isArray(data)) {

      const albums = getAllAlbums(data)
      setAllAlbums(albums)

      const artistSongs = data.reduce((acc, e) => {
        const artistName = e.master_metadata_album_artist_name
        const songName = e.master_metadata_track_name
        const albumName = e.master_metadata_album_album_name
        const timestamp = e.ts
        const msPlayed = e.ms_played
        const reasonStart = e.reason_start
        const reasonEnd = e.reason_end
        const shuffle = e.shuffle
        const skipped = e.skipped

        if (artistName && songName) {
          if (!acc[artistName]) {
            acc[artistName] = []
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
        return acc
      }, {})


      // عداد الاغاني العام
      if (Array.isArray(data)) {
        const totalMsPlayed = data.reduce((acc, e) => acc + (e.ms_played || 0), 0)
        const totalMinutes = Math.round(totalMsPlayed / 60000)
        setTotalMinutes(totalMinutes)
        console.log("Total Minutes Played:", totalMinutes)
      }


      const artistArray = Object.entries(artistSongs).map(([artist, songs]) => ({
        artist,
        songs,
      }))

      setArtists(artistArray)
    }
  }, [])

  const visibleArtists = artists.slice(0, visibleCount)

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 12)
  };

  const ToOnArtistPage = (artistObj) => {

    localStorage.setItem("artistData", JSON.stringify(artistObj))

    navigate("/artist", { 
      state: { 
        artist: artistObj,
        totalMinutes: totalMinutes,
       }
     })
  }

  const getAllAlbums = (data) => {
    const albumMap = {}

    data.forEach((e) => {
      const albumName = e.master_metadata_album_album_name
      const artistName = e.master_metadata_album_artist_name
      const songName = e.master_metadata_track_name

      // نتأكد أن الألبوم والمغني والأغنية موجودين
      if (albumName && artistName && songName) {
        // إذا الألبوم مش موجود نضيفه
        if (!albumMap[albumName]) {
          albumMap[albumName] = {
            albumName,
            artistName,
            songs: [],
          };
        }

        // نضيف الأغنية إذا ما كانت مكررة
        if (!albumMap[albumName].songs.includes(songName)) {
          albumMap[albumName].songs.push(songName)
        }
      }
    })

    // نحول الـ object لمصفوفة منظمة
    const AllAlbums = Object.values(albumMap)
    return AllAlbums
  }

  return (
    <div>
      {/*السايد بارالجانبي */}
{/*     <Sidebar /> 
 */}      {/* الخلفية المتحركة  */}
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
      
          <div className="p-10 relative z-100 w-[80%] justify-self-end">
            {/* كل الفنانين */}
            <h1 className="text-3xl font-bold flex justify-start items-center gap-2 mt-3 mb-10">
              <span className="text-white">All</span>
              <span className="text-[#8c61f9]">Artists</span>
            </h1>
            <section className="border-2 p-3 border-[#273469ff] rounded-xl">

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

            {/*كل الألبومات yahiea did the Push */}
            <section className="h-[30%] p-3  mt-8">
              <AllAlbums albums={AllAlbum} />
            </section>

            {/*اعلى الفنانين*/}
            <h1 className=" text-3xl font-bold flex justify-start items-center gap-2 mt-3 mb-10">
              <span className="text-white">Top</span>
              <span className="text-[#8c61f9]">Artists</span>
            </h1>
            <section className="border-2 p-3 border-[#273469ff] rounded-xl mt-8">
              <TopArtists artists={artists} />
            </section>
          </div>

      </div>
    </div>


  )
}

export default Artist
