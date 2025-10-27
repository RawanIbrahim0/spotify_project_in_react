import { Link, useNavigate } from "react-router"

const NavBar = ({ userData, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/")
  }

  return (
    <nav
      className="fixed z-400 bg-[#1e27496f] shadow-lg border-b border-[#273469ff] 
    rounded-2xl w-[60%] justify-self-end mt-5 mr-11"
    >
      <div className="container mx-auto px-6 flex flex-row justify-end">
        <div className="flex h-[7vh]">

          <div className="flex items-center space-x-8">
            <Link
              to="/contact"
              className="text-amber-50 hover:text-[#8c61f9] transition duration-300 font-medium text-lg hover:-translate-y-1"
            >
              ContactUs
            </Link>

            {!userData && (
              <Link
                to="/register"
                className="text-amber-50 hover:text-[#8c61f9] transition duration-300 font-medium text-lg hover:-translate-y-1"
              >
                Register
              </Link>
            )}

            {userData && (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-amber-50 hover:text-[#8c61f9] transition duration-300 hover:-translate-y-1"
                >
                  {userData.profileImage && (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#8c61f9] hover:-translate-y-1"
                    />
                  )}
                  <span className="font-medium text-lg">
                    {userData.firstName}
                  </span>
                </Link>
              </div>
            )}

            {userData ? (
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-1 rounded-lg transition duration-300 font-medium text-lg hover:-translate-y-1"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/register"
                className="w-[30%] bg-green-500 hover:bg-green-600 text-white px-5 py-1 rounded-lg transition duration-150 font-medium text-lg hover:-translate-y-1"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
