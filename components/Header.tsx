import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


enum TabId {
  home,
  WhatsBitstacker,
  team,
  WhyChooseus,
  graph,
  roadmaps,
  payoutcycle,
}
const HeaderItems = [
  {
    text: "Home",
    href: "#home",
    tabId: TabId.home,
  },
  {
    text: "What’s Bitstacker",
    href: "#WhatsBitstacker",
    tabId: TabId.WhatsBitstacker,
  },
  {
    text: "Team",
    href: "#team",
    tabId: TabId.team,
  },
  {
    text: "Why Choose us",
    href: "#WhyChooseus",
    tabId: TabId.WhyChooseus,
  },
  {
    text: "Funds Allocation",
    href: "#graph",
    tabId: TabId.graph,
  },
  {
    text: "Roadmaps",
    href: "#roadmaps",
    tabId: TabId.roadmaps,
  },
  {
    text: "Payout Cycle",
    href: "#payoutcycle",
    tabId: TabId.payoutcycle,
  },
];



const Header = () => {
  const [showBgColor, setShowBgColor] = useState(false);
  const [activeTabId, setActiveTabId] = useState<TabId>(TabId.home);

  const ClickHandle = (href: string, tabId: TabId) => {
    window.location.replace(`/${href}`);
    setActiveTabId(tabId);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowBgColor(true);
      } else {
        setShowBgColor(false);
      }
    });
  }, []);


  return (
    <div
      className={` text-[#F9F9F9] static duration-300 py-5 ${
        showBgColor &&
        "bg-[#030303] bg-opacity-60 backdrop-blur-xl	 fixed left-0 right-0 w-full top-0  z-50"
      }`}
    >
      <div className="max-w-[1356px] mx-auto flex  items-center justify-between">
        <div className="flex items-center cursor-pointer">
          <Image
            alt="logo"
            src={"/assets/icons/logo.svg"}
            width={50}
            height={57}
          />
          <h1 className="font-bold text-2xl ml-3"> BitStacker</h1>
        </div>

        <div className="flex items-center space-x-5">
          {HeaderItems.map(({ text, href, tabId }, index) => (
            <h2
              key={index + 1}
              onClick={() => {
                ClickHandle(href, tabId);
              }}
              className={`cursor-pointer duration-300 text-base ${
                activeTabId === tabId
                  ? " text-[#F7931A] font-semibold"
                  : " text-[#fff] font-normal"
              } `}
            >
              {text}
            </h2>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Link href={"/minting"}>
            <div className="border border-[#B4B4B4] rounded-3xl py-2 px-6 cursor-pointer ">
              Minting
            </div>
          </Link>

          <Link href={"/dashboard"}>
            <div className="border border-[#B4B4B4] rounded-3xl py-2 px-6 cursor-pointer ">
              Dashboard
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
