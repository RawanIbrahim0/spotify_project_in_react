// import Hero from "./components/Hero";
// import TrendingSongs from "..//TrendingSongs";
// import AboutUs from "../components/AboutUs";
// import Artists from "../components/Artists";
// import AlbumSection from "../components/Album";
// import Footer from "../components/Footer";
import Hero from "../components/Hero";
import TrendingSongs from '../components/TrendingSongs'
import AboutUs from '../components/AboutUs'
import Artists from '../components/Artists'
import AlbumSection from '../components/Album'
import Footer from '../components/Footer'
import ParticleBackground from "../components/ParticleBackground";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(204,204,255,0.6), rgba(127,127,181,0.7), rgba(135,135,222,0.6))",
            zIndex: 0,
          }}
        />
        {/* القسم اليمين */}
        <div className="relative z-100 ml-[20%] w-[80%] min-h-screen overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden">
          <section>
            <Hero />
          </section>

          <section>
            <TrendingSongs />
          </section>

          <section>
            <Artists />
          </section>

          <section>
            <AlbumSection />
          </section>

          <section>
            <AboutUs />
          </section>

          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
