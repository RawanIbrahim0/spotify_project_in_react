import React from 'react';
// استخدام أيقونة سهم يمين دائري من مكتبة Bootstrap Icons
import { BsArrowRightCircle } from 'react-icons/bs';

const ViewAllButton = ({onclick}) => {
return (
  // العنصر ككل هو الكونتينر
  <div className="flex flex-col items-center cursor-pointer transition duration-300">
    {/* الدائرة (الزر الفعلي) */}
    <button
      onClick={onclick}
      className="w-14 h-14 rounded-full flex items-center justify-center mb-2 transition duration-300 focus:outline-none hover:opacity-80"
      style={{ backgroundColor: "#273469ff" }} // Delft Blue
    >
      {/* الأيقونة */}
      <BsArrowRightCircle
        size={30}
        style={{ color: "#e4d9ffff" }} // Periwinkle
      />
    </button>

    {/* النص تحت الزر */}
    <p className="text-sm font-medium" style={{ color: "#fafaffff" }}>
      View All
    </p>
  </div>
);
};

export default ViewAllButton;