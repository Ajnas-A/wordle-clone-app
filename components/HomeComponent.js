import React, { useState, useEffect } from "react";
import WordPlaceHolder from "./WordPlaceHolder";
import _ from "lodash";
import getData from "../utils/getData";
import Input from "./Input";

function HomeComponent({ data }) {
  const [answerWord, setAnswerWord] = useState([]);
  const [word, setWord] = useState(data);
  const [status, setStatus] = useState(false);
  const [total, setTotal] = useState([]);
  const [showWord, setShowWord] = useState(false);

  let totalState = {};

  useEffect(() => {
    if (answerWord.length === 0) return;
    const initialCheck = word.map((e) => answerWord.includes(e));
    const correctPlaced = word.map((e, i) => e === answerWord[i]);
    totalState = { initialCheck, answerWord, correctPlaced };
    setTotal([...total, totalState]);
    // if (total?.length === 4) checkResult();
    // if (_.isEqual(answerWord, word)) return setStatus(true);
    checkResult();
  }, [answerWord]);

  const onKeyDownHandler = (e, ref) => {
    if (status === "failed") return;
    if (status === true) return;
    if (e.keyCode === 13) {
      setAnswerWord(e.target.value.toLowerCase().split(""));
    }
  };

  const resetGame = () => {
    setShowWord(false);
    getNewWord();
    setAnswerWord([]);
    setStatus(false);
    setTotal([]);
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
    if (total?.length === 4) {
      if (_.isEqual(answerWord, word)) return setStatus(true);
      return setStatus("failed");
    }
    return setStatus(null);
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-gray-200">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-center ">WORDLE</h1>
        <div className="flex flex-col space-y-3">
          <WordPlaceHolder value={0} array={word} totalState={total[0]} />
          <WordPlaceHolder value={1} array={word} totalState={total[1]} />
          <WordPlaceHolder value={2} array={word} totalState={total[2]} />
          <WordPlaceHolder value={3} array={word} totalState={total[3]} />
          <WordPlaceHolder value={4} array={word} totalState={total[4]} />
        </div>
        <div>
          {status === true ? (
            <p>Congrats you win</p>
          ) : (
            status === "failed" && <p>Sorry failed</p>
          )}
          <button onClick={resetGame}>Get another word</button>
        </div>

        <p>Attempt : {total.length} / 5</p>

        <Input onKeyDownHandler={onKeyDownHandler} status={status} />

        <button onClick={handleShowWord}>Show Word</button>
        {showWord && <p>{word}</p>}
      </div>
    </div>
  );
}

export default HomeComponent;
