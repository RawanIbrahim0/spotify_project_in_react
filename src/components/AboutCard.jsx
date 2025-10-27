
const AboutCard = ({ title, description, icon }) => {
  return (
    <div className="
      bg-[#273469] p-6 rounded-lg shadow-lg 
      transform transition-all duration-300 ease-in-out {/* Transition for both scale and background */}
      hover:scale-105 hover:bg-[#30343fff] {/* Scale up and change background to gunmetal */}
      cursor-pointer
    ">
      <h3 className="text-2xl font-semibold mb-4 text-[#8c61f9]">
        {title}
      </h3>
      {description && ( 
        <p className="text-[#fafaffff]">
          {description}
        </p>
      )}
      {icon && ( 
        <div className="mt-4 text-center">
          {icon}
        </div>
      )}
      {title === "OUR VALUES" && ( 
        <ul className="list-disc list-inside text-[#fafaffff] space-y-2">
          <li>Innovation, Community</li>
          <li>Quality</li>
          <li>Accessibility</li>
        </ul>
      )}
    </div>
  )
}

export default AboutCard