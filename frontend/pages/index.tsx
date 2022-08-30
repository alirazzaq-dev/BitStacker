// import type { NextPage } from "next";
import React from "react";

import Image from "next/image";
import {
  Header,
  Banner,
  WhyBitStacker,
  TheTeam,
  WhyChooseUs,
  RoadMap,
  Footer,
  PayoutCycle,
  Graph,
} from "../components";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      data: "SSG",
    },
  };
};


// Instructions 
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication


// Reader
// https://robkendal.co.uk/blog/reading-google-sheets-data-using-javascript-with-google-sheets-reader


const Home = () => {
  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: "url('./assets/pictures/orange-circle.png')",
          }}
          className="bg-no-repeat bg-right-top	 "
        >
          <div className="max-w-[1356px] mx-auto">
            <Header />
            <Banner />
            <WhyBitStacker />
            <TheTeam />
            <WhyChooseUs />
            <Graph />
            <RoadMap />
          </div>
          <PayoutCycle />
          <div className="max-w-[1356px] mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
