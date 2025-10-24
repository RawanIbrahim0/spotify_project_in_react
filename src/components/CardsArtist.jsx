
const CardsArtist = ({ name,onclick }) => {
    return (
      <div onClick={onclick} className='flex flex-col justify-center items-center text-center cursor-pointer '> 
        <img src="/assets/images/singer.jpeg" alt="this is image" className="rounded-full w-[50%] h-[50%]" />
            <p className="text-xl">{name}</p>
      </div>
    );
};

export default CardsArtist