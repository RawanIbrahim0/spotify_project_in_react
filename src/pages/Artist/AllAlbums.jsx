import { useRef } from "react"
import CardAlbums from "../../components/CardAlbums"
import { ChevronLeft, ChevronRight } from "lucide-react"

const AllAlbums = ({ albums }) => {

  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 300
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-[50vh]">
      {/* العنوان + زر العرض */}
      <div className="flex justify-between items-center mt-3 mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-white">All</span>
          <span className="text-[#8c61f9]">Albums</span>
        </h1>
      </div>

      {/* الأسهم */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#8c61f9]/70 hover:bg-[#8c61f9] text-white p-2 rounded-full shadow-md z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#8c61f9]/70 hover:bg-[#8c61f9] text-white p-2 rounded-full shadow-md z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* قائمة الألبومات */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 mt-6 custom-scroll pb-2 scroll-smooth"
      >
        {albums.map((album, index) => (
          <div key={index} className="flex-shrink-0 w-48">
            <CardAlbums
              index={index}
              name={album.albumName}
              artist={album.artistName}
              songsCount={album.songs.length}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAlbums
