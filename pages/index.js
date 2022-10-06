import Head from "next/head";
import HomeComponent from "../components/HomeComponent";
import getData from "../utils/getData";
import getWordDetails from "../utils/getWordDetails";
import getWordHints from "../utils/getWordHints";

export default function Home({ data, wordHint }) {
  return (
    <div className="">
      <Head>
        <title>Wordle Clone</title>
        <meta name="description" content="A Wordle Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <HomeComponent data={data} wordHint={wordHint} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, wordHint } = await getWordDetails();

  // Pass data to the page via props
  return { props: { data, wordHint } };
}
