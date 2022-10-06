export default async (word) => {
  const wordData = word.join("");

  let data = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${wordData}`
  ).then((e) => e.json());

  return data[0]?.meanings[0].definitions[0].definition || "No hints available";
};
