export default (prevState, action) => {
  switch (action.type) {
    case "SHOW":
      return { ...prevState, showHint: true };
    case "HIDE":
      return { ...prevState, showHint: false };
    case "CHANGE_HINT":
      return { showHint: false, word: action.payload };
    default:
      return prevState;
  }
};
