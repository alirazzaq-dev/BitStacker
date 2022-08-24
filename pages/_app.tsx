import Head from "next/head";
import type { AppProps } from "next/app";
import {Wrapper} from "../components";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Head>
        <title>BitStacker</title>
        <meta name="BitStacker" content="BitStacker NFT" />
        <link rel="icon" href="./assets/icons/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
