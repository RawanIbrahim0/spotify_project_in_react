import AboutCard from "./AboutCard"
import GIF from "/assets/img/CAT-unscreen.gif"
import {
  FaMicrophoneAlt,
  FaMusic,
  FaHeadphonesAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa"

const AboutUs = () => {
  return (
    <div className="flex-1 p-8 text-[#273469] min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-[#273469]">
            OUR STORY
          </h1>
          <p className="text-xl text-[#30343fff]">
            Passion for Music & Community
          </p>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
         
          <img
            src= {GIF} 
            className="w-full h-full object-cover rounded-xl "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <AboutCard
          title="OUR MISSION"
          description="To create a seamless platform for sharing, and experience music from every corner the globe."
          icon={<FaMicrophoneAlt className="w-10 h-10 inline-block text-[#8c61f9]" />}
        />
        <AboutCard
          title="OUR COMMUNITY"
          description="To foster a global community where artists thrive from ever the globe."
          icon={<FaMusic className="w-10 h-10 inline-block text-[#8c61f9]" />}
        />
        <AboutCard
          title="OUR VISION"
          description="To foster a global community where, thrive and listeners find soundtrack to life."
          icon={<FaHeadphonesAlt className="w-10 h-10 inline-block text-[#8c61f9]" />}
        />
        <AboutCard
          title="OUR VALUES"
        />
      </div>

      <div className="text-center mb-8">
        <p className="text-xl text-[#30343fff] mb-6">
          JOIN US ON THIS MUSICAL JOURNEY
        </p>
        <button className="bg-[#8c61f9] hover:bg-[#7a4ee0] text-[#fafaffff] font-bold py-3 px-8 rounded-full transition-colors duration-300">
          EXPLORE NOW
        </button>
      </div>

    
    </div>
  )
}

export default AboutUs
