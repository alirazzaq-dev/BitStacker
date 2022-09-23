import Head from "next/head";
import type { AppProps } from "next/app";
import { Wrapper } from "../components";
import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";


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
        <ChakraProvider>
          <ToastContainer
            toastStyle={{ backgroundColor: "black" }}
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </Web3ReactProvider>
    </Wrapper>
  );
}

export default MyApp;
