import { useState } from "react";
import { useNavigate } from "react-router";
import ParticleBackground from "../components/ParticleBackground";

const Register = ({ setUserData }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });

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

  // في صفحة Register - تأكد إنه عندك هالدالة
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(form); // ← هاد رح يعدل state في App.jsx
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
        <div className="p-10 relative z-100 w-[80%] justify-self-end min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-amber-50 mb-6">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-[#273469ff]/80 p-6 rounded-xl w-[90%] max-w-md text-amber-50 shadow-lg"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleInput}
              required
              className="p-2 rounded bg-[#1e2749ff]/40 focus:outline-none focus:ring-2 focus:ring-[#8c61f9]"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleInput}
              required
              className="p-2 rounded bg-[#1e2749ff]/40 focus:outline-none focus:ring-2 focus:ring-[#8c61f9]"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleInput}
              required
              className="p-2 rounded bg-[#1e2749ff]/40 focus:outline-none focus:ring-2 focus:ring-[#8c61f9]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              required
              className="p-2 rounded bg-[#1e2749ff]/40 focus:outline-none focus:ring-2 focus:ring-[#8c61f9]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInput}
              required
              className="p-2 rounded bg-[#1e2749ff]/40 focus:outline-none focus:ring-2 focus:ring-[#8c61f9]"
            />
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="p-2 rounded cursor-pointer bg-[#6B21A8] hover:bg-[#9333EA] text-amber-50"
            />
            <button
              type="submit"
              className="mt-4 bg-[#8c61f9] p-2 rounded hover:bg-[#3D348B] transition font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
