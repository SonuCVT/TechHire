import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ name, selectedDate, onChange }) => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <DatePicker
        dateFormat="dd-MM-yyyy"
        minDate={new Date()}
        selected={selectedDate}
        onChange={(date) => onChange({ target: { name, value: date } })}
        className="w-full border-none outline-none"
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default CustomDatePicker;
