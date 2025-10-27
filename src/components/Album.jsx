import React from "react";
import CardComponent from "./CardComponent.jsx";
import ViewAllButton from "./ViewAllButton.jsx";
import EdSheeran from "/assets/img/EdSheeran.jpg"
import Måneskin from "/assets/img/Måneskin.jpeg"
import Adele from "/assets/img/Adele2.jpeg"
import { useNavigate } from "react-router";


const musicVideos = [
  {
    id: 1,
    title: "Gossip",
    artist: "Måneskin",
    views: "3M views",
    imageUrl: Måneskin ,
  },
  {
    id: 2,
    title: "Shape Of You",
    artist: "Ed Sheeran",
    views: "5M views",
    imageUrl: EdSheeran ,
  },
  {
    id: 3,
    title: "Someone Like You",
    artist: "Adele",
    views: "3M views",
    imageUrl: Adele ,
  },
];

 
  
const AlbumSection = () => {
 const navigate = useNavigate();

 const ToOnArtistPage = (artistObj) => {
   navigate("/allArtist");
 };

  return (
    <section className="py-10 px-6">
      <h2 className="text-4xl font-bold  mb-8  " style={{ color: "#273469" }}>
        Albums
      </h2>

      <div className="flex justify-evenly items-center text-[#8c61f9] mt-15">
        {musicVideos.map((video) => (
          <CardComponent
            key={video.id}
            title={video.title}
            artist={video.artist}
            views={video.views}
            imageUrl={video.imageUrl}
          />
        ))}

        <ViewAllButton onclick={ToOnArtistPage} />
      </div>
    </section>
  );
};

export default AlbumSection;
