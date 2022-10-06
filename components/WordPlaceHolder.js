import React, { useEffect, useState } from "react";
import setDelay from "./../utils/getDelay";

function WordPlaceHolder({ array, totalState, value }) {
  const [greenSpots, setGreenSpots] = useState([]);
  const [yellowArray, setYellowArray] = useState([]);
  let tempGreenSpots =
    totalState?.correctPlaced.map((e) => (e === true ? true : false)) || [];

  useEffect(() => {
    setGreenSpots(tempGreenSpots);
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

  // const data = `${
  //   greenSpots[i] ? "bg-green-400" : yellowArray[i] ? "bg-yellow-400" : ""
  // }`;

  return (
    <div className="grid grid-cols-5 gap-2">
      {array.map((e, i) => {
        return (
          <div
            key={i}
            className={`${
              greenSpots[i]
                ? "bg-green-700"
                : yellowArray[i]
                ? "bg-yellow-600"
                : "bg-gray-600"
            }  h-12 w-12 border flex items-center justify-center transition text-white capitalize font-semibold duration-500 ${setDelay(
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

export default React.memo(WordPlaceHolder);
