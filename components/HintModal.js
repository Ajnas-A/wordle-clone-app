import React from "react";

function HintModal({ hint, onClickHandler }) {
  return (
    <div className="h-40 absolute bg-gray-100/25 top-1/3 w-2/3">
      <div className="flex items-center justify-center h-full relative">
        <div
          className="absolute right-10 top-5"
          onClick={() => onClickHandler({ type: "HIDE" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-red-500 transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="p-2">
          <p className="p-2 bg-gray-800 ">{hint}</p>
        </div>
      </div>
    </div>
  );
}

export default HintModal;
