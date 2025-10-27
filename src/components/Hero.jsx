import { useEffect, useState } from "react"
import bg1 from "/assets/img/bg1.png"
import bg2 from "/assets/img/bg2.png"
import bg3 from "/assets/img/bg3.png"

const Slides = [
  { id: 1, image: bg1, bgColor: "#2b2f36" },
  { id: 2, image: bg2, bgColor: "#183a7a" },
  { id: 3, image: bg3, bgColor: "#1b2744" },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const [flashActive, setFlashActive] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % Slides.length)

      setTimeout(() => {
        setFlashActive(true)
        setTimeout(() => setFlashActive(false), 1000)
      }, 1000)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden">
      <style>
        {`
          @keyframes flashMove {
            0% { left: 125%; }
            100% { left: -75%; }
          }
        `}
      </style>

      {Slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: slide.bgColor }}
        >
          <img src={slide.image} className="w-full h-full object-cover" />

          {flashActive && index === current && (
            <div
              style={{position: "absolute",top: 0,left: "125%", width: "50%",height: "100%",
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
                filter: "blur(15px)",animation: "flashMove 1s linear forwards",zIndex: 20,
              }}
            ></div>
          )}

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-4xl text-white font-bold text-center px-4 drop-shadow-lg"></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Hero
