import Head from "next/head";
import HomeComponent from "../components/HomeComponent";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Wordle Clone</title>
        <meta name="description" content="A Wordle Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <HomeComponent />
      </div>
    </div>
  );
}
