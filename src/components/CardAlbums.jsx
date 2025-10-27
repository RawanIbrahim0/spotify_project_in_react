
const CardAlbums = ({name,songsCount,index,artist}) => {

  const imageNumber = (index % 20) + 1
  const imagePath = `/assets/images/album${imageNumber}.jpeg`

  return (
    <div className='flex flex-col justify-center items-center text-center rounded-xl '>
      <img
        src={imagePath}
        alt="artist"
        className="w-[70%] h-[70%] rounded-xl" />
      <p className="text-xl w-[70%]">{name} <strong className='text-[#8c61f9]'> ( {songsCount} songs)</strong></p>
      
    </div>
  )
}

export default CardAlbums
