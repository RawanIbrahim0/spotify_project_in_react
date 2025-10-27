import { Link, useNavigate } from "react-router";
import img from '../assets/img/logo.png'

const NavBar = ({ userData, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav
      className="fixed z-400 bg-[#1e27496f] shadow-lg border-b border-[#273469ff] 
    rounded-2xl w-[60%] justify-self-end mt-5 mr-11"
    >
      <div className="container mx-auto px-6 flex flex-row justify-end">
        <div className="flex h-[7vh]">
          {/* الشعار أو اسم التطبيق */}
          {/* <div className="text-amber-50 flex-1 ">
            <Link to="/">
              <img src={} alt="" className="w-[30%] hover:-translate-x-1 transition duration-300 hover:shadow-2xl" />
            </Link>
          </div> */}

          {/* قائمة الروابط */}
          <div className="flex items-center space-x-8">
            {/* زر ContactUs - دايماً ظاهر */}
            <Link
              to="/contact"
              className="text-amber-50 hover:text-[#8c61f9] transition duration-300 font-medium text-lg hover:-translate-y-1"
            >
              ContactUs
            </Link>

            {/* زر Register - يظهر فقط إذا المستخدم مش مسجل */}
            {!userData && (
              <Link
                to="/register"
                className="text-amber-50 hover:text-[#8c61f9] transition duration-300 font-medium text-lg hover:-translate-y-1"
              >
                Register
              </Link>
            )}

            {/* زر Profile - يظهر فقط إذا المستخدم مسجل */}
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

            {/* زر Login/Logout */}
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
  );
};

export default NavBar;
