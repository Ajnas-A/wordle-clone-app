import React, { useState, useEffect, useReducer } from "react";
import WordPlaceHolder from "./WordPlaceHolder";
import _ from "lodash";
import Input from "./Input";
import getWordDetails from "../utils/getWordDetails";
import HintModal from "./HintModal";
import reducerHint from "../utils/reducerHint";
import { useRouter } from "next/router";

function HomeComponent({ data, wordHint }) {
  const router = useRouter();
  const [answerWord, setAnswerWord] = useState([]);
  const [word, setWord] = useState(data);
  const [hint, dispatchHint] = useReducer(reducerHint, {
    showHint: false,
    word: wordHint,
  });
  const [status, setStatus] = useState(false);
  const [total, setTotal] = useState([]);
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    let totalState = {};
    if (answerWord.length === 0) return;
    const initialCheck = word.map((e) => answerWord.includes(e));
    const correctPlaced = word.map((e, i) => e === answerWord[i]);
    totalState = { initialCheck, answerWord, correctPlaced };
    setTotal([...total, totalState]);
    checkResult();
  }, [answerWord]);

  const onKeyDownHandler = (e, setValue) => {
    if (status === "failed") return;
    if (status === true) return;
    if (e.keyCode === 13) {
      setAnswerWord(e.target.value.toLowerCase().split(""));
      setValue("");
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
    // router.reload();
    const { data, wordHint } = await getWordDetails();
    dispatchHint({
      type: "CHANGE_HINT",
      payload: wordHint,
    });
    setWord(data);
  };

  const handleShowWord = () => setShowWord(true);

  const checkResult = () => {
    if (_.isEqual(answerWord, word)) return setStatus(true);
    if (total?.length === 4) {
      if (_.isEqual(answerWord, word)) return setStatus(true);
      return setStatus("failed");
    }
    return setStatus(null);
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-gray-200 relative">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-center ">WORDLE</h1>
        <div className="flex flex-col space-y-3">
          <WordPlaceHolder value={0} array={word} totalState={total[0]} />
          <WordPlaceHolder value={1} array={word} totalState={total[1]} />
          <WordPlaceHolder value={2} array={word} totalState={total[2]} />
          <WordPlaceHolder value={3} array={word} totalState={total[3]} />
          <WordPlaceHolder value={4} array={word} totalState={total[4]} />
        </div>
        <div className="flex flex-col space-y-2">
          {status === true ? (
            <p>Congrats you win</p>
          ) : (
            status === "failed" && <p>Sorry failed</p>
          )}
          <button
            className="bg-gray-600 rounded p-2 hover:bg-gray-400"
            onClick={resetGame}
          >
            Get another word
          </button>
        </div>

        <p>Attempt : {total.length} / 5</p>

        <Input onKeyDownHandler={onKeyDownHandler} status={status} />

        <button
          className="bg-gray-600 rounded p-2 hover:bg-gray-400"
          onClick={() => dispatchHint({ type: "SHOW" })}
        >
          Show Hint
        </button>
        {hint.showHint && (
          <HintModal hint={hint.word} onClickHandler={dispatchHint} />
        )}

        <button
          className="bg-gray-600 rounded p-2 hover:bg-gray-400"
          onClick={handleShowWord}
        >
          Show Word
        </button>
        {showWord && <p>{word}</p>}
      </div>
    </div>
  );
}

export default HomeComponent;
