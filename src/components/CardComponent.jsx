
const CardComponent = ({ title, artist, views, imageUrl }) => {
  return (
    <div
      className="w-64 text-left flex flex-col space-y-2 p-3 rounded-xl flex-shrink-0 
                 transition-all duration-300 hover:scale-[1.10] 
                 bg-[#273469ff] hover:bg-[#30343fff] cursor-pointer"
    >
      <div className="relative rounded-lg overflow-hidden w-full  shadow-lg">
        <img
          src={imageUrl}
          alt={`Thumbnail for ${title}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 right-0 bg-[#e4d9ffff] bg-opacity-70 text-xs px-2 py-1 rounded-tl-lg font-medium">
          {views}
        </div>
      </div>

      <div className="pt-1">
        <p className="text-base font-bold truncate text-[#8c61f9] hover:text-[#fafaff] transition-colors duration-300">
          {title}
        </p>
        <p className="text-sm truncate text-gray-400 hover:text-[#d1d1d1] transition-colors duration-300">
          {artist}
        </p>
      </div>
    </div>
  )
}

export default CardComponent
