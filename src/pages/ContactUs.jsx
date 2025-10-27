import { useState } from "react";
import { useNavigate } from "react-router";
import ParticleBackground from "../components/ParticleBackground";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending data
    setTimeout(() => {
      console.log("Message sent:", formData);
      setIsSubmitting(false);
      alert(
        "Thank you! Your message has been sent successfully and we'll get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
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
        <div className="min-h-screen w-[80%] justify-self-end  pt-20 relative overflow-hidden">
          {/* Gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br
       from-[#1e2749ff] via-[#273469ff] to-[#8c61f9] -z-20"
          ></div>

          {/* Visual effects */}
          <div
            className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/10 rounded-full
       blur-3xl -z-10"
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 
      rounded-full blur-3xl -z-10"
          ></div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-amber-50 mb-4">
                Contact Us
              </h1>
              <p className="text-amber-50/80 text-xl max-w-2xl mx-auto">
                We're here to help! Reach out to us for any inquiries, feedback,
                or comments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-[#273469ff]/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-50/10">
                <h2 className="text-2xl font-bold text-amber-50 mb-6">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-50/80 text-sm mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-xl bg-[#1e2749ff]/40 border border-amber-50/20 text-amber-50 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:border-transparent transition duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-50/80 text-sm mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-xl bg-[#1e2749ff]/40 border border-amber-50/20 text-amber-50 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:border-transparent transition duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-amber-50/80 text-sm mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl bg-[#1e2749ff]/40 border border-amber-50/20 text-amber-50 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:border-transparent transition duration-300"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-50/80 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full p-4 rounded-xl bg-[#1e2749ff]/40 border border-amber-50/20 text-amber-50 focus:outline-none focus:ring-2 focus:ring-[#8c61f9] focus:border-transparent transition duration-300 resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8c61f9] hover:bg-yellow-600 disabled:bg-yellow-500/50 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Company Info */}
                <div className="bg-[#273469ff]/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-50/10">
                  <h2 className="text-2xl font-bold text-amber-50 mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#8c61f9]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-amber-50 font-semibold text-lg">
                          Phone
                        </h3>
                        <p className="text-amber-50/80">+962 7 9012 3456</p>
                        <p className="text-amber-50/80">+962 7 7890 1234</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#8c61f9]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-amber-50 font-semibold text-lg">
                          Email
                        </h3>
                        <p className="text-amber-50/80">support@musicapp.com</p>
                        <p className="text-amber-50/80">info@musicapp.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#8c61f9]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-amber-50 font-semibold text-lg">
                          Address
                        </h3>
                        <p className="text-amber-50/80">
                          Amman, Al Madinah Al Munawarah Street
                        </p>
                        <p className="text-amber-50/80">Jordan</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#8c61f9]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-amber-50 font-semibold text-lg">
                          Business Hours
                        </h3>
                        <p className="text-amber-50/80">
                          Sunday - Thursday: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-amber-50/80">
                          Friday - Saturday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-[#273469ff]/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-50/10">
                  <h2 className="text-2xl font-bold text-amber-50 mb-6">
                    Follow Us
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex items-center justify-center space-x-2 bg-[#1e2749ff]/40 hover:bg-[#1DA1F2] text-amber-50 p-4 rounded-xl transition duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      <span>Twitter</span>
                    </a>

                    <a
                      href="#"
                      className="flex items-center justify-center space-x-2 bg-[#1e2749ff]/40 hover:bg-[#1877F2] text-amber-50 p-4 rounded-xl transition duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href="#"
                      className="flex items-center justify-center space-x-2 bg-[#1e2749ff]/40 hover:bg-[#E4405F] text-amber-50 p-4 rounded-xl transition duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="#"
                      className="flex items-center justify-center space-x-2 bg-[#1e2749ff]/40 hover:bg-[#0A66C2] text-amber-50 p-4 rounded-xl transition duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/")}
                className="bg-transparent hover:bg-amber-50/10 text-amber-50 font-semibold py-3 px-8 rounded-xl border border-amber-50/30 transition duration-300 transform hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
