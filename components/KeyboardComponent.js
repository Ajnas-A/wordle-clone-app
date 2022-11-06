import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function KeyboardComponent({ keyboardEnter, disabledArray, status }) {
  const [input, setInput] = useState("");
  const checkEnterButton = (button) => {
    if (status === "failed") {
      alert("Game Over Please start over");
      return;
    }

    if (status) return;

    if (button === "{enter}") {
      return keyboardEnter(input, setInput);
    }
    if (button === "{bksp}") {
      let array = input.split("");
      array.pop();
      let word = array.join("");
      setInput(word);
      return;
    }
    let counter = 0;
    disabledArray.map((e) => {
      if (button === e) counter++;
    });

    if (counter === 0) setInput(input + button);
  };

  return (
    <>
      <input type="text" value={input} disabled className="px-2" />
      <Keyboard
        buttonTheme={[
          {
            class: "enableClass",
            buttons:
              "Q W E R T Y A S D F G H J K L Z X C V B N M {bksp} {enter} U I O P ",
          },
          {
            class: "disableClass",
            buttons: disabledArray.join(" "),
          },
        ]}
        theme={"hg-theme-default hg-layout-default myTheme"}
        onKeyPress={checkEnterButton}
        maxLength={3}
        disableButtonHold={true}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M",
            "{bksp} {enter}",
          ],
        }}
      />
    </>
  );
}

export default KeyboardComponent;
