import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TopSongsChart = ({ songs }) => {
  const aggregatedSongsMap = songs.reduce((map, song) => {
    const key = (song.songName || "").trim().toLowerCase();
    if (!map[key]) {
      map[key] = {
        songName: song.songName,
        albumName: song.albumName,
        totalMsPlayed: Number(song.msPlayed) || 0,
      };
    } else {
      map[key].totalMsPlayed += Number(song.msPlayed) || 0;
    }
    return map;
  }, {});

  const chartData = Object.values(aggregatedSongsMap)
    .map((s) => ({
      ...s,
      minutesPlayed: Number((s.totalMsPlayed / 60000).toFixed(2)),
    }))
    .sort((a, b) => b.minutesPlayed - a.minutesPlayed)
    .slice(0, 10);

  return (
    <section className="mt-10">
      <h3 className="flex justify-start gap-2  font-semibold mb-4">
        <p className="text-3xl font-bold"> Top 10 Songs </p>{" "}
        <p className="text-3xl font-bold text-[#8c61f9]"> by Listening Time</p>
      </h3>

      <div className="bg-white/10 p-3 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 85 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="songName"
              tick={{ fill: "#fff" }}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => `${value} min`}
            />
            <Bar dataKey="minutesPlayed" fill="#facc15" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TopSongsChart;
