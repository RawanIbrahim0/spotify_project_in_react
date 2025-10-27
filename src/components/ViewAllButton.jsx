import { BsArrowRightCircle } from 'react-icons/bs'

const ViewAllButton = ({onclick}) => {
return (
  <div className="flex flex-col items-center cursor-pointer transition duration-300">
    <button
      onClick={onclick}
      className="w-14 h-14 rounded-full flex items-center justify-center mb-2 transition duration-300 focus:outline-none hover:opacity-80"
      style={{ backgroundColor: "#273469ff" }} 
    >
      <BsArrowRightCircle
        size={30}
        style={{ color: "#e4d9ffff" }} 
      />
    </button>

    <p className="text-sm font-medium" style={{ color: "#fafaffff" }}>
      View All
    </p>
  </div>
)
}

export default ViewAllButton