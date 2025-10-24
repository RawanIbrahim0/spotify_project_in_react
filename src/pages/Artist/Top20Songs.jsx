import { useState, useEffect } from "react";
import FilterButton from "../../components/FilterButton";
import TopSongsChart from "../../components/TopSongsChart";

const Top20SongsSection = ({ songs }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    applyFilter(activeFilter);
  }, [songs, activeFilter]);

  const applyFilter = (filterType) => {
    setActiveFilter(filterType);
    const now = new Date();
    let cutoffDate = new Date(0);

    if (filterType === "Last Year") {
      cutoffDate = new Date();
      cutoffDate.setFullYear(now.getFullYear() - 1);
    } else if (filterType === "Last 6 month") {
      cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - 6);
    } else if (filterType === "Last 4 week") {
      cutoffDate = new Date();
      cutoffDate.setDate(now.getDate() - 28);
    }

    const filtered = songs.filter(
      (song) => new Date(song.timestamp) >= cutoffDate
    );
    setFilteredSongs(filtered);

    // تجميع الأغاني المكررة حسب songName وجمع msPlayed
    const aggregatedMap = filtered.reduce((map, song) => {
      const key = (song.songName || "").trim().toLowerCase();
      if (!map[key]) {
        map[key] = {
          songName: song.songName,
          albumName: song.albumName,
          artistName: song.artistName,
          totalMsPlayed: Number(song.msPlayed) || 0,
          occurrences: 1,
        };
      } else {
        map[key].totalMsPlayed += Number(song.msPlayed) || 0;
        map[key].occurrences += 1;
      }
      return map;
    }, {});

    const top20 = Object.values(aggregatedMap)
      .map((s) => ({
        ...s,
        minutesPlayed: Number((s.totalMsPlayed / 60000).toFixed(2)),
      }))
      .sort((a, b) => b.totalMsPlayed - a.totalMsPlayed)
      .slice(0, 20);

    setTopSongs(top20);
  };

  return (
    <section className="mt-6 w-[80%] justify-self-end">
      <h3 className="text-2xl font-semibold text-amber-200 mb-2">Top 20 Songs</h3>

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
      <table className="min-w-full bg-transparent text-white border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-amber-400">
            <th>#</th>
            <th>Song Name</th>
            <th>Album</th>
            <th>Minutes Played</th>
          </tr>
        </thead>
        <tbody>
          {topSongs.map((song, index) => (
            <tr key={index} className="hover:bg-white/10">
              <td>{index + 1}</td>
              <td>{song.songName}</td>
              <td>{song.albumName}</td>
              <td>{song.minutesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* BarChart للأغاني */}
          <TopSongsChart songs={filteredSongs} />
    </section>
  );
};

export default Top20SongsSection;