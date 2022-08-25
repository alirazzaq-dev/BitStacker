import Head from "next/head";
import type { AppProps } from "next/app";
import {Wrapper} from "../components";
import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

const getLibrary = (provider: ExternalProvider) => {
  return new Web3Provider(provider);
};

declare global {
  interface Window {
      ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Head>
        <title>BitStacker</title>
        <meta name="BitStacker NFTs" content="BitStacker NFTs" />
        <link rel="icon" href="./assets/icons/logo.svg" />
      </Head>
      
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>

    </Wrapper>
  );
}

export default MyApp;
