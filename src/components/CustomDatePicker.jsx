import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CustomDatePicker = ({ name, selectedDate, onChange }) => {
  return (
    <div className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onChange({ target: { name, value: date } })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="dd-MM-yyyy HH:mm"
        minDate={new Date()}
        className="w-full border-none outline-none"
        wrapperClassName="w-full"
      />
    </div>
  );
};
export default CustomDatePicker;






