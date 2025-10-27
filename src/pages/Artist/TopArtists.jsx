import { useEffect, useState } from "react"
import CardsArtist from "../../components/CardsArtist"
import FilterButton from "../../components/FilterButton"
import { useNavigate } from "react-router"


const TopArtists = ({ artists }) => {
  const [sortedArtists, setSortedArtists] = useState([])
  const [visibleCount, setVisibleCount] = useState(12)
  const [activeFilter, setActiveFilter] = useState("All")

  const navigate = useNavigate()


  useEffect(() => {
    filterArtists("All")
  }, [artists])

  const filterArtists = (filterType) => {
    setActiveFilter(filterType)

    const now = new Date()
    let cutoffDate = new Date(0)

    if (filterType === "Last Year") {
      cutoffDate = new Date()
      cutoffDate.setFullYear(now.getFullYear() - 1)
    } else if (filterType === "Last 6 month") {
      cutoffDate = new Date()
      cutoffDate.setMonth(now.getMonth() - 6)
    } else if (filterType === "Last 4 week") {
      cutoffDate = new Date()
      cutoffDate.setDate(now.getDate() - 28)
    }

    const filtered = artists.map((artist) => {
      const recentSongs = artist.songs.filter(
        (song) => new Date(song.timestamp) >= cutoffDate
      )
      return { ...artist, songs: recentSongs }
    })

    const sorted = [...filtered].sort(
      (a, b) => b.songs.length - a.songs.length
    );

    setSortedArtists(sorted.slice(0, 100))
    setVisibleCount(12)
  }

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, 100))
  }

  const ToOnArtistPage = (artistObj) => {
    navigate("/artist", { state: { artist: artistObj } })
  }

  const visibleArtists = sortedArtists.slice(0, visibleCount)

  return (
    <div>
      <div>
        <div className="flex justify-end items-center gap-2 mt-2">
          <FilterButton
            text="All"
            onclick={() => filterArtists("All")}
            isClicked={activeFilter === "All"}
          />
          <FilterButton
            text="Last 4 week"
            onclick={() => filterArtists("Last 4 week")}
            isClicked={activeFilter === "Last 4 week"}
          />
          <FilterButton
            text="Last 6 month"
            onclick={() => filterArtists("Last 6 month")}
            isClicked={activeFilter === "Last 6 month"}
          />
          <FilterButton
            text="Last Year"
            onclick={() => filterArtists("Last Year")}
            isClicked={activeFilter === "Last Year"}
          />
        </div>
      </div>

      <div className="h-[33vh] overflow-y-auto custom-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-7">
        {visibleArtists.map((artistObj, index) => (
          <div key={index}>
            <CardsArtist
              index={index}
              name={artistObj.artist}
              onclick={() => ToOnArtistPage(artistObj)} />
          </div>
        ))}
      </div>

      {visibleCount < 100 && (
        <button
          onClick={handleViewMore}
          className="bg-[#8c61f9] text-white px-4 py-2 mt-4 rounded hover:bg-[#7a4ff0]"
        >
          View More
        </button>
      )}
    </div>
  )
}

export default TopArtists
