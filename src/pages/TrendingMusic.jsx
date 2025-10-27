import { useEffect, useState } from "react"
import { Play, Clock, BarChart3, Headphones, BookOpen, Search } from "lucide-react"
import spotifyData from "../spotify_data_history.json"
import SongCard from "../components/SongCard"
import { useNavigate } from "react-router"

import ParticleBackground from "../components/ParticleBackground"


export default function TrendingMusic() {
  const [tracks, setTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [stats, setStats] = useState({
    totalListeningTime: 0,
    dailyListening: 0,
    listeningTime: 0,
    chapters: 0,
  })
  const [chartData, setChartData] = useState([])
  const [visibleCount, setVisibleCount] = useState(100)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchDate, setSearchDate] = useState('')

  useEffect(() => {
    const validTracks = spotifyData
      .filter((item) => item.master_metadata_track_name && item.ts)
      .map((item, i) => {
        const originalDate = new Date(item.ts)

        const monthsOffset = i % 12
        const updatedDate = new Date()
        updatedDate.setMonth(updatedDate.getMonth() - monthsOffset)

        return {
          title: item.master_metadata_track_name,
          artist: item.master_metadata_album_artist_name,
          album: item.master_metadata_album_album_name,
          releaseDate: updatedDate,
          originalTs: item.ts,
          durationMs: item.ms_played,
          duration: `${Math.floor(item.ms_played / 60000)}:${String(
            Math.floor((item.ms_played % 60000) / 1000)
          ).padStart(2, "0")}`,
        }
      })

    setTracks(validTracks)
    setFilteredTracks(validTracks)
    calculateStats(validTracks)
    generateChart(validTracks)
  }, [])

  useEffect(() => {
    let filtered = [...tracks]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (track) =>
          track.title?.toLowerCase().includes(query) ||
          track.artist?.toLowerCase().includes(query) ||
          track.album?.toLowerCase().includes(query)
      )
    }

    if (searchDate) {
      const selectedDate = new Date(searchDate)
      filtered = filtered.filter(track => {
        const trackDate = new Date(track.originalTs || track.releaseDate)
        return trackDate.toDateString() === selectedDate.toDateString()
      })
    }

    setFilteredTracks(filtered)
    calculateStats(filtered)
    generateChart(filtered)
  }, [searchQuery, searchDate, tracks])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => Math.min(prev + 100, filteredTracks.length))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [filteredTracks])

  const calculateStats = (list) => {
    if (list.length === 0) {
      setStats({
        totalListeningTime: 0,
        dailyListening: 0,
        listeningTime: 0,
        chapters: 0,
      })
      return
    }

    const totalMs = list.reduce((sum, t) => sum + t.durationMs, 0)
    const avgPerDay = totalMs / 30
    const avgListening = totalMs / list.length

    setStats({
      totalListeningTime: (totalMs / 3600000).toFixed(1),
      dailyListening: (avgPerDay / 3600000).toFixed(1),
      listeningTime: (avgListening / 60000).toFixed(1),
      chapters: list.length,
    })
  }

  const generateChart = (list) => {
    const grouped = {};
    list.forEach((t) => {
      const dateKey = t.releaseDate.toISOString().split("T")[0]
      grouped[dateKey] = (grouped[dateKey] || 0) + t.durationMs / 60000
    })

    const chartArray = Object.keys(grouped).map((date) => ({
      date,
      minutes: grouped[date].toFixed(1),
    }))

    setChartData(chartArray.slice(-15))
  };

  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
    const now = new Date();
    let filtered = [];

    if (filterType === "All") {
      filtered = tracks;
    } else if (filterType === "Year") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(now.getFullYear() - 1)
      filtered = tracks.filter((t) => t.releaseDate >= oneYearAgo)
    } else if (filterType === "Last six months") {
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(now.getMonth() - 6)
      filtered = tracks.filter((t) => t.releaseDate >= sixMonthsAgo)
    } else if (filterType === "Last four weeks") {
      const fourWeeksAgo = new Date()
      fourWeeksAgo.setDate(now.getDate() - 28)
      filtered = tracks.filter((t) => t.releaseDate >= fourWeeksAgo)
    }

    setFilteredTracks(filtered)
    calculateStats(filtered)
    generateChart(filtered)
    setVisibleCount(20)
  }
    const navigate = useNavigate()

 const ToOnArtistPage = () => {
    navigate("/music_player")
  }
  return (
    <div>
      {/* الخلفية المتحركة  */}
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(30, 39, 73, 0.6)",
            zIndex: 0,
          }}
        />
        {/* محتوى الصفحة */}
        <section className="relative z-100 p-10 w-[80%] justify-self-end">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <img
                src="/assets/images/history.jpeg"
                alt="Trending Music"
                className="w-32 h-32 rounded-xl shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2 text-[#8c61f9]">
                  The History
                </h1>
                <p className="text-gray-200 text-sm">
                  Explore your most listened tracks and stats
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <button
                onClick={ToOnArtistPage}
                className="px-6 py-3 bg-pink-800 hover:bg-pink-600 text-white rounded-full flex items-center space-x-2 shadow-md font-medium"
              >
                <Play className="w-5 h-5" />
                <span>Play All</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:bg-white/20 transition-all duration-200">
              <BarChart3 className="w-8 h-8 text-yellow-400 mb-2" />
              <h3 className="text-lg font-semibold">Total listening times</h3>
              <p className="text-2xl font-bold mt-1">
                {stats.totalListeningTime} h
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:bg-white/20 transition-all duration-200">
              <Headphones className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="text-lg font-semibold">Daily listening</h3>
              <p className="text-2xl font-bold mt-1">
                {stats.dailyListening} h
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:bg-white/20 transition-all duration-200">
              <Clock className="w-8 h-8 text-blue-300 mb-2" />
              <h3 className="text-lg font-semibold">Listening time</h3>
              <p className="text-2xl font-bold mt-1">Evenning</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:bg-white/20 transition-all duration-200">
              <BookOpen className="w-8 h-8 text-pink-400 mb-2" />
              <h3 className="text-lg font-semibold">The Season</h3>
              <p className="text-2xl font-bold mt-1">Winter</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by track, artist, or album..."
                className="w-full bg-white/10 backdrop-blur-md rounded-full py-3 px-6 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:bg-white/20 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-white/10 backdrop-blur-md rounded-full py-3 px-6 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:bg-white/20 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:invert(1) [&::-webkit-calendar-picker-indicator]:opacity-70"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
              <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-center space-x-6 mb-8 text-gray-200 font-semibold">
            {["All", "Year", "Last six months", "Last four weeks"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={`px-3 py-1 rounded-md transition ${
                    activeFilter === filter
                      ? "bg-[#8c61f9] text-white font-bold"
                      : "hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Songs List */}
          <div className="h-[60vh] space-y-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 overflow-auto custom-scroll">
            {filteredTracks.length > 0 ? (
              filteredTracks
                .slice(0, visibleCount)
                .map((track, index) => (
                  <SongCard
                    key={index}
                    index={index}
                    rank={index + 1}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    releaseDate={track.releaseDate}
                    time={track.duration}
                    coverUrl="https://via.placeholder.com/150"
                  />
                ))
            ) : (
              <div className="text-center py-8 text-gray-300">
                No tracks found for this period
              </div>
            )}

            {/* مؤشر تحميل */}
            {visibleCount < filteredTracks.length && (
              <div className="text-center py-6 text-gray-300 animate-pulse">
                Loading more tracks...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
