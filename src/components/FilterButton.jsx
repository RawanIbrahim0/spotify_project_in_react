const FilterButton = ({ text, isClicked, onclick }) => {
  return isClicked ? (
    <button
      onClick={onclick}
      className="p-1 bg-[#8c61f9] font-bold rounded-2xl w-[10%] cursor-pointer text-white"
    >
      {text}
    </button>
  ) : (
    <button
      onClick={onclick}
      className="p-1 bg-[#e4d9ffff] text-[#30343fff] rounded-2xl w-[10%] cursor-pointer"
    >
      {text}
    </button>
  )
}

export default FilterButton
