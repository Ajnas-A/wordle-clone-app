import React, { useState, useEffect } from "react";
import WordPlaceHolder from "./WordPlaceHolder";
import _ from "lodash";

function HomeComponent() {
  const [answerWord, setAnswerWord] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [word, setWord] = useState([]);
  const [status, setStatus] = useState(false);
  const [initialCheck, setInitialCheck] = useState([]);
  const [correctPlaced, setCorrectPlaced] = useState([]);

  const [showWord, setShowWord] = useState(false);
  const [totalState, setTotalState] = useState([
    {
      correctPlaced: [],
      initialCheck: [],
      answerWord: [],
    },
  ]);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setAnswerWord(e.target.value.split(""));
      setInputValue("");
    }
  };

  const resetGame = () => {
    setShowWord(false);
    getNewWord();
    setAnswerWord([]);
    setStatus(false);
    setInitialCheck([]);
    setCorrectPlaced([]);
    setInputValue("");
    setTotalState([
      {
        correctPlaced: [],
        initialCheck: [],
        answerWord: [],
      },
    ]);
  };

  const getNewWord = async () => {
    const response = await fetch(
      "http://thatwordleapi.azurewebsites.net/get/"
    ).then((res) => res.json());
    console.log(response.Response);
    setWord(response.Response.split(""));

    setWord(response.Response.split(""));
    console.log(response.Response);
  };

  const handleShowWord = () => {
    setShowWord(true);
  };

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    if (totalState.length - 1 === 5) return setStatus("failed");
  }, [totalState]);

  useEffect(() => {
    if (answerWord.length === 0) return;

    if (status === true) return;

    const wordsPresent = word.map((e) => {
      return answerWord.includes(e);
    });
    setInitialCheck(wordsPresent);
    if (_.isEqual(answerWord, word)) return setStatus(true);
  }, [answerWord]);

  useEffect(() => {
    if (initialCheck.length === 0) return;
    const totalCorrect = word.map((e, i) => {
      if (e === answerWord[i]) return true;
    });
    setCorrectPlaced(totalCorrect);
  }, [initialCheck]);

  useEffect(() => {
    if (correctPlaced.length === 0) return;
    setTotalState([...totalState, { initialCheck, answerWord, correctPlaced }]);
  }, [correctPlaced]);

  return (
    <div className="h-screen bg-gray-400 flex items-center justify-center">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-center ">WORDLE</h1>
        <div className="flex flex-col space-y-3">
          <WordPlaceHolder array={word} totalState={totalState[1]} />
          <WordPlaceHolder array={word} totalState={totalState[2]} />
          <WordPlaceHolder array={word} totalState={totalState[3]} />
          <WordPlaceHolder array={word} totalState={totalState[4]} />
          <WordPlaceHolder array={word} totalState={totalState[5]} />
        </div>
        <div>
          {status === true ? (
            <p>Congrats you win</p>
          ) : (
            status === "failed" && <p>Sorry failed</p>
          )}
          <button onClick={resetGame}>Get another word</button>
        </div>

        <p>Attempt : {totalState.length - 1} / 5</p>
        <input
          className="p-4
         bg-gray-600 focus:outline-none text-white"
          onKeyDown={onKeyDownHandler}
          onChange={handleOnChange}
          type="text"
          name=""
          id=""
          value={inputValue}
        />

        <button onClick={handleShowWord}>Get Word</button>
        {showWord && <p>{word}</p>}
      </div>
    </div>
  );
}

export default HomeComponent;
