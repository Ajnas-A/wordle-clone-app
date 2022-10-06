export default async () => {
  const response = await fetch(
    "http://thatwordleapi.azurewebsites.net/get/"
  ).then((res) => res.json());
  const data = response.Response.split("");
  return data;
};
