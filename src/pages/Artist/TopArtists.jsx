import React, { useEffect, useState } from 'react';

const TopArtists = ({ artists }) => {
  const [sortedArtists, setSortedArtists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    console.log('Artists:', artists); 

    const sorted = [...artists]; 
    sorted.sort((a, b) => b.songs.length - a.songs.length); 

    const top100Artists = sorted.slice(0, 100);

    console.log('Sorted Artists (Top 100):', top100Artists); 
    setSortedArtists(top100Artists); 
  }, [artists]);

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, 100)); 
  };

  const visibleArtists = sortedArtists.slice(0, visibleCount); 

  return (
    <div>
    <div>
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
        <span className="text-white">Top</span>
        <span className="text-[#8c61f9]">Artists</span>
      </h1>
      <div className='w-[80%] flex justify-evenly items-center gap-2'>
        <button className='p-1 bg-[#273469ff] rounded-2xl w-[12%]'>
            All
        </button>
        <button>
            Last Year
        </button>
        <button>
            Last 6 month
        </button>
          <button>
            Last 4 week
        </button>
      </div>
    </div>

      
      <div className='h-[50vh]  overflow-y-auto custom-scroll'>
        {visibleArtists.map((artistObj, index) => (
          <div key={index}>
            <h2>{artistObj.artist}</h2>
          </div>
        ))}
      </div>

      {visibleCount < 100 && (
        <button
          onClick={handleViewMore}
          className="bg-[#8c61f9] text-white px-4 py-2 mt-4 rounded hover:bg-[#7a4ff0]"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default TopArtists;
