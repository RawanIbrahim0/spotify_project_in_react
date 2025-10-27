
const CardsArtist = ({ name, onclick, index }) => {
  const imageNumber = (index % 20) + 1;
  const imagePath = `/assets/images/singer${imageNumber}.jpeg`;

  return (
    <div onClick={onclick} className='flex flex-col justify-center items-center text-center cursor-pointer '>
      <img
        src={imagePath}
        alt="artist"
        className="rounded-full w-[50%] h-[50%] hover:scale-105 duration-200 transform" />
      <p className="text-xl">{name}</p>
    </div>
  )
}

export default CardsArtist