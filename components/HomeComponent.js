import React, { useState, useEffect } from "react";
import WordPlaceHolder from "./WordPlaceHolder";
import _ from "lodash";
import getData from "../utils/getData";
import Input from "./Input";

function HomeComponent({ data }) {
  const [answerWord, setAnswerWord] = useState([]);
  const [word, setWord] = useState(data);
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

  const onKeyDownHandler = (e, ref) => {
    if (status === "failed") return;
    if (status === true) return;
    if (e.keyCode === 13) {
      setAnswerWord(e.target.value.toLowerCase().split(""));
      ref.current.blur();
    }
  };

  const resetGame = () => {
    setShowWord(false);
    getNewWord();
    setAnswerWord([]);
    setStatus(false);
    setInitialCheck([]);
    setCorrectPlaced([]);
    setTotalState([
      {
        correctPlaced: [],
        initialCheck: [],
        answerWord: [],
      },
    ]);
  };

  const getNewWord = async () => {
    const response = await getData();
    setWord(response);
  };

  const handleShowWord = () => {
    setShowWord(true);
  };

  const checkResult = () => {
    if (_.isEqual(answerWord, word)) return setStatus(true);
    return setStatus("failed");
  };

  useEffect(() => {
    if (totalState.length - 1 === 5) checkResult();
  }, [totalState]);

  useEffect(() => {
    if (answerWord.length === 0) return;

    if (status === true) return;

    if (status === "failed") return;

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
    <div className="h-screen bg-gray-900 flex items-center justify-center text-gray-200">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-center ">WORDLE</h1>
        <div className="flex flex-col space-y-3">
          <WordPlaceHolder value={0} array={word} totalState={totalState[1]} />
          <WordPlaceHolder value={1} array={word} totalState={totalState[2]} />
          <WordPlaceHolder value={2} array={word} totalState={totalState[3]} />
          <WordPlaceHolder value={3} array={word} totalState={totalState[4]} />
          <WordPlaceHolder value={4} array={word} totalState={totalState[5]} />
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

        <Input onKeyDownHandler={onKeyDownHandler} status={status} />

        <button onClick={handleShowWord}>Show Word</button>
        {showWord && <p>{word}</p>}
      </div>
    </div>
  );
}

export default HomeComponent;
