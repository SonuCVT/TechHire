import React from "react";

const DateFormatter = ({ timestamp, format = "DD-MM-YYYY" }) => {
  if (!timestamp) return null;

  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  let formattedDate;
  switch (format) {
    case "YYYY-MM-DD":
      formattedDate = `${year}-${month}-${day}`;
      break;
    case "MM-DD-YYYY":
      formattedDate = `${month}-${day}-${year}`;
      break;
    case "DD/MM/YYYY":
      formattedDate = `${day}/${month}/${year}`;
      break;
    default:
      formattedDate = `${day}-${month}-${year}`;
  }

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
