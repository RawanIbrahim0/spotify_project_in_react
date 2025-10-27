import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import ParticleBackground from "../components/ParticleBackground"

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    } else {
      navigate("/register")
    }
  }, [navigate])

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-amber-50 text-xl"> Loading ...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(30, 39, 73, 0.6)",
            zIndex: 0,
          }}
        />
        <div className="min-h-screen pt-22 p-6 w-[80%] justify-self-end">
          {/* خلفية مع شفافية */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#1e2749ff] opacity-95 -z-10"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-[#273469ff]/96 rounded-2xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                {/* قسم الصورة */}
                <div className="md:w-1/3 bg-[#1e2749ff]/60 p-8 flex flex-col items-center justify-center">
                  {userData.profileImage ? (
                    <div className="relative">
                      <img
                        src={userData.profileImage}
                        alt="Profile"
                        className="w-48 h-48 rounded-full object-cover border-4 border-[#8c61f9]"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gray-600 flex items-center justify-center border-4 border-yellow-300">
                      <span className="text-amber-50 text-2xl">No Image</span>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-amber-50 mt-6">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-amber-50/80 mt-2">
                    Member since {new Date().toLocaleDateString("ar-EG")}
                  </p>
                </div>

                {/* قسم المعلومات */}
                <div className="md:w-2/3 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* الاسم الأول */}
                    <div className="bg-[#1e2749ff]/60 p-4 rounded-xl">
                      <label className="block text-amber-50/70 text-sm mb-2">
                        First Name
                      </label>
                      <p className="text-amber-50 text-lg font-semibold">
                        {userData.firstName}
                      </p>
                    </div>

                    {/* الاسم الأخير */}
                    <div className="bg-[#1e2749ff]/60 p-4 rounded-xl">
                      <label className="block text-amber-50/70 text-sm mb-2">
                        Last Name
                      </label>
                      <p className="text-amber-50 text-lg font-semibold">
                        {userData.lastName}
                      </p>
                    </div>

                    {/* البريد الإلكتروني */}
                    <div className="bg-[#1e2749ff]/60 p-4 rounded-xl md:col-span-2">
                      <label className="block text-amber-50/70 text-sm mb-2">
                        Email
                      </label>
                      <p className="text-amber-50 text-lg font-semibold">
                        {userData.email}
                      </p>
                    </div>

                    {/* رقم الهاتف */}
                    <div className="bg-[#1e2749ff]/60 p-4 rounded-xl md:col-span-2">
                      <label className="block text-amber-50/70 text-sm mb-2">
                        Phone Number
                      </label>
                      <p className="text-amber-50 text-lg font-semibold">
                        {userData.phone}
                      </p>
                    </div>

                  
                  </div>

                  {/* أزرار التحكم */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => navigate("/edit-profile")}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition duration-300"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="flex-1 bg-[#273469ff] hover:bg-[#1e2749ff] text-amber-50 py-3 rounded-xl font-semibold transition duration-300 border border-amber-50/20"
                    >
                      Back Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
