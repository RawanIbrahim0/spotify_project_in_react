import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import cat from "/assets/img/marshmello.png"
import QR from "/assets/img/QRcode.png"
import { AiOutlineYoutube } from "react-icons/ai"


const Footer = () => {
  const melodiesLinks = ["Songs", "Radio", "Podcast"]
  const accessLinks = ["Explor", "Artists", "Playlists", "Albums", "Trending"]
  const contactLinks = ["About", "Policy", "Support"]

  return (
    <footer
      className="bg-gradient-to-r from-[#1e2749ff] via-[#1e2749ff] to-[#1e2749ff] text-white py-10 "
      style={{ width: '79.2vw', marginLeft: 'auto' }}
    >
      <div className='flex flex-col justify-center gap-3'>
        <div className="flex justify-center ">
          <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] gap-x-8 items-start w-full max-w-[1200px] px-4">


            <div className="col-span-1 flex items-start justify-start pl-3">
              <img
                src={cat}
                className=" h-auto object-contain "
              />
            </div>

            <div className="col-span-1 text-left mr-5">
              <h4 className="text-2xl font-bold mb-3 text-[#8c61f9]">Harmoni</h4>
              <ul className="space-y-1">
                {melodiesLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm hover:text-gray-300 transition duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>


            <div className="col-span-1 text-left">
              <h4 className="text-2xl font-bold mb-3 text-[#8c61f9]">Access</h4>
              <ul className="space-y-1">
                {accessLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm hover:text-gray-300 transition duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>


            <div className="col-span-1 flex items-start justify-end">
              <div className="flex items-start gap-x-20 pr-2">


                <div className="text-left">
                  <h4 className="text-2xl font-bold mb-3 text-[#8c61f9]">Contact</h4>
                  <ul className="space-y-1">
                    {contactLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-sm hover:text-gray-300 transition duration-200">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>


                <div className="flex flex-col items-end pr-1 mt-5">
                  <img src={QR} />

                </div>


              </div>
            </div>


          </div>

        </div>
        <div className="flex md:flex-row items-center justify-between pl-10 pr-10 text-sm text-[#afafaf] pt-8 border-t border-[#afafaf]">
          <p className="mb-4 md:mb-0">© 2025 Harmoni - All Rights Reserved</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-[#8c61f9] transition-colors duration-200"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-[#8c61f9] transition-colors duration-200"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-[#8c61f9] transition-colors duration-200"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-[#8c61f9] transition-colors duration-200"
            >
              <AiOutlineYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>


      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
