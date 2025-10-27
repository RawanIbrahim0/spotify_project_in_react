import { useState, useEffect } from "react"
import FilterButton from "../../components/FilterButton"
import TopSongsChart from "../../components/TopSongsChart"
import CardsSong from "../../components/CardsSong"

const Top20SongsSection = ({ songs }) => {
  const [activeFilter, setActiveFilter] = useState("All")
  const [filteredSongs, setFilteredSongs] = useState([])
  const [topSongs, setTopSongs] = useState([])

  useEffect(() => {
    applyFilter(activeFilter)
  }, [songs, activeFilter])

  const applyFilter = (filterType) => {
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

    const filtered = songs.filter(
      (song) => new Date(song.timestamp) >= cutoffDate
    )
    setFilteredSongs(filtered)

    const aggregatedMap = filtered.reduce((map, song) => {
      const key = (song.songName || "").trim().toLowerCase()
      if (!map[key]) {
        map[key] = {
          songName: song.songName,
          albumName: song.albumName,
          artistName: song.artistName,
          totalMsPlayed: Number(song.msPlayed) || 0,
          occurrences: 1,
        }
      } else {
        map[key].totalMsPlayed += Number(song.msPlayed) || 0
        map[key].occurrences += 1
      }
      return map
    }, {})

    const top20 = Object.values(aggregatedMap)
      .map((s) => ({
        ...s,
        minutesPlayed: Number((s.totalMsPlayed / 60000).toFixed(2)),
      }))
      .sort((a, b) => b.totalMsPlayed - a.totalMsPlayed)
      .slice(0, 20)

    setTopSongs(top20)
  }

  return (
    <section className="mt-6">
         <h1 className="text-3xl font-bold flex justify-start items-center gap-2 mb-7">
                <span className="text-white">Top 20</span>
                <span className="text-[#8c61f9]">Songs</span>
              </h1>
      {/* أزرار الفلترة */}
      <div className="flex justify-end items-center gap-2 mb-4">
        {["All", "Last 4 week", "Last 6 month", "Last Year"].map((filter) => (
          <FilterButton
            key={filter}
            text={filter}
            onclick={() => applyFilter(filter)}
            isClicked={activeFilter === filter}
          />
        ))}
      </div>

      {/* جدول الأغاني */}
          <div className="  h-[33vh]  overflow-y-auto custom-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {topSongs.map((song, index) => (
                    <div key={index}>
                      <CardsSong
                        index={index}
                        name={song.songName}
                      />
                    </div>
                  ))}
                </div>
              </div>
        {/* BarChart للأغاني */}
          <TopSongsChart songs={filteredSongs} />
    </section>
  )
}

export default Top20SongsSection