import Image from "next/image";
import { Discord } from "../public/assets/icons";
const FooterItems = [
  {
    text: "Home",
    href: "#home",
  },
  {
    text: "What’s Bitstacker",
    href: "#WhatsBitstacker",
  },
  {
    text: "Team",
    href: "#team",
  },
  {
    text: "Why Choose us",
    href: "#WhyChooseus",
  },
  {
    text: "Funds Allocation",
    href: "#FundsAllocation",
  },
  {
    text: "Roadmaps",
    href: "#roadmaps",
  },
  {
    text: "Payout Cycle",
    href: "#payoutcycle",
  },
];
const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        alt="logo"
        width={110}
        height={110}
        src={"/assets/icons/logo.svg"}
      />
      <h1 className="font-bold text-4xl mt-4 mb-3">BitStacker</h1>
      <h4 className="font-normal text-lg mb-5 leading-[36px] opacity-90">
        Redefining the concept of cloud mining through Ethereum NFTs
      </h4>

      <div className="flex items-center">
        <div className="mx-2">
          <Image
            alt="twitter"
            width={36}
            height={29}
            src={"/assets/icons/twitter.svg"}
          />
        </div>

        <div className="mx-2">
          <Image
            alt="linkedIn"
            width={31}
            height={30}
            src={"/assets/icons/linkedin.svg"}
          />
        </div>

        <div className="mx-2">
          <Discord />
        </div>

        <div className="mx-2">
          <Image
            alt="medium"
            width={32}
            height={25}
            src={"/assets/icons/medium.svg"}
          />
        </div>
      </div>

      {/* <div className="flex items-center justify-between w-full mt-10">
        {FooterItems.map(({ text }, index) => (
          <h3 className="font-base font-normal" key={index}>
            {text}
          </h3>
        ))}
      </div> */}

      <div className="bg-[#fff] opacity-10 mt-8 mb-4 h-px w-full max-w-[780px]"></div>
      <p className="opacity-50 text-base font-normal mb-2">
        © 2022 BITSTACKER NFT. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
