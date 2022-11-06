import React from "react";
import getDelay from "./../utils/getDelay";

function WordPlaceHolder({ array, totalState, value }) {
  let tempGreenSpots =
    totalState?.correctPlaced.map((e) => (e === true ? true : false)) || [];

  let tempYellowSpots = [];
  tempGreenSpots?.map((e, i) => {
    if (e === false) {
      if (totalState?.initialCheck[i]) {
        tempYellowSpots[totalState?.answerWord.indexOf(array[i])] = true;
      }
    }
  });

  return (
    <div className="grid grid-cols-5 gap-2">
      {array.map((e, i) => {
        return (
          <div
            key={i}
            className={`${
              tempGreenSpots[i]
                ? "bg-green-700"
                : tempYellowSpots[i]
                ? "bg-yellow-600"
                : "bg-gray-600"
            } transition ${getDelay(i)} workPlaceHolder`}
          >
            <p>{totalState?.answerWord[i]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(WordPlaceHolder);
