import React, { useEffect, useState } from "react";
import setDelay from "./../utils/getDelay";

function WordPlaceHolder({ array, totalState }) {
  const [greenSpots, setGreenSpots] = useState([]);
  const [yellowArray, setYellowArray] = useState([]);

  useEffect(() => {
    setGreenSpots(
      totalState?.correctPlaced.map((e) => (e === true ? true : false)) || []
    );
  }, [totalState]);

  useEffect(() => {
    let yellowTempArray = [];
    greenSpots?.map((e, i) => {
      if (e === false) {
        if (totalState?.initialCheck[i]) {
          yellowTempArray[totalState?.answerWord.indexOf(array[i])] = true;
        }
      }
    });
    setYellowArray(yellowTempArray);
  }, [greenSpots]);
  return (
    <div className="grid grid-cols-5 gap-2">
      {array.map((e, i) => {
        return (
          <div
            className={`${
              greenSpots[i]
                ? "bg-green-400 rotate-0"
                : yellowArray[i]
                ? "bg-yellow-400 rotate-0"
                : ""
            } bg-blue-300 rotate-360 h-12 w-12 border flex items-center justify-center transition duration-500 ${setDelay(
              i
            )}`}
          >
            <p>{totalState?.answerWord[i]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WordPlaceHolder;
