import { useNavigate } from "react-router";
import logo from "../assets/img/logo-3d.png";
import {
  FaCompactDisc,
  FaUserAlt,
  FaPlayCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: "Home", icon: <FaCompactDisc />, path: "/" },
    { id: 1, name: "General", icon: <FaCompactDisc />, path: "/general" },
    { id: 2, name: "Artists", icon: <FaUserAlt />, path: "/allArtist" },
    { id: 3, name: "History Most Played", icon: <FaPlayCircle />, path: "/history" },
    { id: 4, name: "Logout", icon: <FaSignOutAlt />, path: "" },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {

      alert("You have been logged out!");
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className="w-[20%] fixed z-10 h-screen flex flex-col justify-between py-8 px-4 border-r-2 border-[#8c61f9]"
      style={{
        backgroundColor: "#1e2749fc",
        color: "#fafaffff",
        boxShadow: "5px 0 10px -3px rgba(140, 97, 249,0.8)",
      }}
    >
      <div className="mb-10 text-center">
        <img
          src={logo}
          alt="artist"
          className="mx-auto"
          style={{
            animation: "float 3s ease-in-out infinite",
          }}
        />  <style>
          {`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}
        </style>
      </div>

      <ul className="space-y-10">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center gap-3 text-lg font-medium cursor-pointer rounded-xl py-2 px-3 transition-all duration-200 transform hover:scale-105`}
            style={{
              backgroundColor:
                item.name === "Logout" ? "#30343fff" : "#273469ff",
              color: "#fafaffff",
            }}
          >
            <span className="text-xl" style={{ color: "#e4d9ffff" }}>
              {item.icon}
            </span>
            <span className="hover:text-[#e4d9ffff]">{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mt-10 text-sm opacity-70">
        <p>© 2025 Harmoni</p>
      </div>
    </div>
  );
}

export default Sidebar;
