// import type { NextPage } from "next";
import React from 'react'

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
