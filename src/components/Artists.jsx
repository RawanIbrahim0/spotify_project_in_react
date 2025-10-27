import ArtistCard from './ArtistCard'; 
import artist1 from '/assets/img/Artists/artist1.png';
import artist2 from '/assets/img/Artists/artist2.png';
import artist3 from '/assets/img/Artists/artist3.png';
import artist4 from '/assets/img/Artists/artist4.png';
// import artist5 from '/assets/img/Artists/artist5.png';
import ViewAllButton from './ViewAllButton';
import { useNavigate } from "react-router";


const Artists = () => {
  const artistsData = [
    { id: 1, name: 'The Neighborhood', imageUrl: artist1 },
    { id: 2, name: 'Nightmares', imageUrl: artist2 },
    { id: 3, name: 'Tate McRae', imageUrl: artist3 },
    { id: 4, name: 'Imagine Dragons', imageUrl: artist4 },
    // { id: 5, name: 'Dua Lipa', imageUrl: artist5 },
  ];

  
    const navigate = useNavigate()

    const ToOnArtistPage = (artistObj) => {
      navigate("/allArtist");
  }
  
  return (
    <div className="flex-1 p-[40px]">
      <h2 className="text-4xl font-bold text-center md:text-left mb-12 text-[#273469ff] drop-shadow-lg">
        Our Artists
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {artistsData.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            imageUrl={artist.imageUrl}
          />
        ))}

        <div className="flex justify-center items-center">
          <ViewAllButton onclick={ToOnArtistPage} />
        </div>
      </div>
    </div>
  );
};

export default Artists;
