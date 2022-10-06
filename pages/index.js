import Head from "next/head";
import HomeComponent from "../components/HomeComponent";
import getData from "../utils/getData";

export default function Home({ data }) {
  return (
    <div className="">
      <Head>
        <title>Wordle Clone</title>
        <meta name="description" content="A Wordle Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <HomeComponent data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getData();

  // Pass data to the page via props
  return { props: { data } };
}
