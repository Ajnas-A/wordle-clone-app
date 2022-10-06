import getData from "./getData";
import getWordHints from "./getWordHints";

export default async () => {
  const data = await getData();
  const wordHint = await getWordHints(data);

  return { data, wordHint };
};
