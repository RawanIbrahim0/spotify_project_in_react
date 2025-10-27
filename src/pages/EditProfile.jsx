import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ParticleBackground from "../components/ParticleBackground";

const EditProfile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    profileImage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setForm(JSON.parse(storedUser));
    }
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(form));
    navigate("/profile");
  };

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

      <div className="min-h-screen p-6 w-[80%] justify-self-end ">
        <div className="absolute top-0 left-0 w-full h-full bg-[#1e2749ff] opacity-90 -z-10"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-amber-50 text-center mb-8">
            Edit Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#273469ff]/80 p-8 rounded-2xl shadow-2xl"
          >
            <div className="space-y-6">
              {/* صورة البروفايل */}
              <div className="flex flex-col items-center">
                {form.profileImage ? (
                  <img
                    src={form.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#8c61f9] mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center border-4 border-yellow-300 mb-4">
                    <span className="text-amber-50">No Image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="text-amber-50"
                />
              </div>

              {/* الحقول */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={form.firstName}
                  onChange={handleInput}
                  className="p-3 rounded bg-[#1e2749ff]/40 text-amber-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={form.lastName}
                  onChange={handleInput}
                  className="p-3 rounded bg-[#1e2749ff]/40 text-amber-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={form.email}
                  onChange={handleInput}
                  className="p-3 rounded bg-[#1e2749ff]/40 text-amber-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:col-span-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="phone number"
                  value={form.phone}
                  onChange={handleInput}
                  className="p-3 rounded bg-[#1e2749ff]/40 text-amber-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:col-span-2"
                />
              </div>

              {/* الأزرار */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition duration-300"
                >
                  Save Edit
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition duration-300"
                >
                  Cancle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EditProfile;
