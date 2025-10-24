import logo from "../assets/img/logo.png"
import {
  FaCompactDisc,
  FaUserAlt,
  FaPlayCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { id: 1, name: "Albums", icon: <FaCompactDisc /> },
    { id: 2, name: "Artists", icon: <FaUserAlt /> },
    { id: 3, name: "Most Played", icon: <FaPlayCircle /> },
    { id: 4, name: "Logout", icon: <FaSignOutAlt /> },
  ]

  return (
    <div
      className="w-[20%] fixed z-10 h-screen flex flex-col justify-between py-8 px-4"
      style={{ backgroundColor: "#1e2749ff", color: "#fafaffff" }}
    >
      <div className="mb-10 text-center">
        <img src={logo} />
      </div>

      <ul className="space-y-10">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 text-lg font-medium cursor-pointer rounded-xl py-2 px-3 
                        transition-all duration-200 transform hover:scale-105`}
            style={{
              backgroundColor:
                item.name === "Logout" ? "#30343fff" : "#273469ff",
              color: "#fafaffff",
            }}
          >
            <span
              className="text-xl"
              style={{
                color: "#e4d9ffff",
              }}
            >
              {item.icon}
            </span>
            <span className="hover:text-[#e4d9ffff]">{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mt-10 text-sm opacity-70">
        <p>© 2025 Harmoni </p>
      </div>
    </div>
  );
}

export default Sidebar