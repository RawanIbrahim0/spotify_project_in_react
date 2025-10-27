import { useEffect } from "react";

const ParticleBackground = (Background) => {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      particlesJS("particles-js", {
        particles: {
          number: { value: 35, density: { enable: true, value_area: 800 } },
          shape: {
            type: "image",
            image: { src: "/assets/images/one.png", width: 30, height: 30}
          },
          size: { value: 30, random: true },
          opacity: { value: 0.5 },
          move: { enable: true, speed: 3 },
          line_linked: { enable: false }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        },
        retina_detect: true
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#2c3e50",
        zIndex: -1
      }}
    />
  );
};

export default ParticleBackground;

