import { useNavigate } from "react-router"

const CardsSong = ({ name,index}) => {
  const imageNumber = (index % 20) + 1
  const imagePath = `/assets/images/m${imageNumber}.jpeg`
 const navigate = useNavigate()

  const ToOnArtistPage = () => {
    navigate("/music_player")
  }
  
  return (
    <div onClick={ToOnArtistPage} className='flex flex-col justify-center items-center text-center cursor-pointer '>
      <img
        src={imagePath}
        alt="artist"
        className="w-[50%] h-[50%] rounded-xl" />
           <div className="flex  justify-center items-center">  
      <p className="text-2xl">{index+1}#</p>
      <p className="text-xl w-[70%]">{name}</p>
     </div>
    </div>
  )
}

export default CardsSong