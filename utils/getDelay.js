export default (delay) => {
  return {
    0: "delay-[200ms]",
    1: "delay-[400ms]",
    2: "delay-[600ms]",
    3: "delay-[800ms]",
    4: "delay-[1000ms]",
  }[delay];
};
