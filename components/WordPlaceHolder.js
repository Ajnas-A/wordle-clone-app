import React from "react";
import setDelay from "./../utils/getDelay";

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

  // let tempYellowSpots = [];
  // totalState?.correctPlaced?.map((e, i) => {
  //   if (e === false) {
  //     if (totalState?.initialCheck[i]) {
  //       tempYellowSpots[totalState?.answerWord.indexOf(array[i])] = true;
  //     }
  //   }
  // });

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
