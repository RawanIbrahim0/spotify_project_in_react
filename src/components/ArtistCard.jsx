
const ArtistCard = ({ name, imageUrl }) => {
  return (
    <div className="
      flex flex-col items-center p-4 
      transform transition-transform duration-300 hover:scale-120 
      cursor-pointer
    ">
      
      <div className="
        relative 
        w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-45 xl:h-45
        rounded-full 
        p-[4px] 
        bg-gradient-to-r from-[#30343f] to-[#273469ff] 
        overflow-hidden 
      ">
      
        <div className="
          w-full h-full 
          rounded-full 
          overflow-hidden 
          flex items-center justify-center 
        ">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-[#273469ff] text-center mt-4">{name}</h3>
    </div>
  )
}

export default ArtistCard