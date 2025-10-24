
const CardsArtist = ({ name,onclick }) => {
    return (
      <div onClick={onclick} className='flex flex-col justify-center items-center text-center cursor-pointer '> 
        <img src="/assets/images/ddd.png" alt="this is image" className="rounded-full w-[40%] h-[40%]" />
            <p className="text-xl">{name}</p>
      </div>
    );
};

export default CardsArtist