import React, { useState, useRef } from "react";

function Input({ onKeyDownHandler, status }) {
  const ref = useRef();
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    if (status === "failed") return;
    if (status === true) return;
    setValue(e.target.value);
  };
  return (
    <input
      className="p-4
 bg-gray-600 focus:outline-none text-white"
      onKeyDown={(e) => onKeyDownHandler(e, setValue)}
      onChange={handleOnChange}
      type="text"
      name=""
      id=""
      ref={ref}
      placeholder="Enter the Words"
      value={value}
    />
  );
}

export default Input;
