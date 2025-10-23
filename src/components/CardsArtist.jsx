import React from 'react'

const CardsArtist = ({ name }) => {
    return (
      <div className='flex flex-col justify-center items-center text-center '> 
        <img src="ddd.jpg" alt="" className="rounded-full w-[80%]" />
            <p className="text-2xl">{name}</p>
      </div>
    );
};

export default CardsArtist