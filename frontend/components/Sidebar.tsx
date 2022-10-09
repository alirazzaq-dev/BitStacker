import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Logout } from "../assests/icons";
import { ActiveHomeIcon, ActiveMintIcon, ActiveSupportIcon, HomeIcon, MintIcon, SupportIcon } from "../assests/icons/DashboardIcons";

enum NavTabId {
  Home,
  Mint,
  Support,
}

const NavItems = [
  {
    text: "Home",
    navTabId: NavTabId.Home,
    icon: <HomeIcon />,
    activeIcon: <ActiveHomeIcon />,
    link: "dashboard"
  },
  {
    text: "Mint",
    navTabId: NavTabId.Mint,
    icon: <MintIcon />,
    activeIcon: <ActiveMintIcon />,
    link: "/minting"

  },
  {
    text: "Support",
    navTabId: NavTabId.Support,
    icon: <SupportIcon />,
    activeIcon: <ActiveSupportIcon />,
    link: "https://discord.com/invite/XQuPx75wKE"
  },
];


const Sidebar = () => {


  const router = useRouter();
  const { active, activate, deactivate, chainId, account, library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();

  const [activeTab, setActiveTab] = useState<NavTabId>(NavTabId.Home);

  useEffect(() => {
    const { pathname } = router;
    if (pathname === "/minting") {
      setActiveTab(NavTabId.Mint);
    } else if (pathname === "/dashboard") {
      setActiveTab(NavTabId.Home);
    }
  }, [router]);

  const clickHandle = (href: string) => {
    if (href === "Home") {
      router.push("/dashboard");
    } else if (href === "Mint") {
      router.push("/minting");
    }
    else {
      router.push("https://discord.com/invite/XQuPx75wKE")
    }
  };

  const disconnect = async () => {
    deactivate();
  };

  return (
    <div className="w-44 bg-[#121212] min-h-screen fixed left-0 top-0 flex flex-col ">
      <Link href={"/"}>
        <div className="flex items-center justify-center border-b border-[#FFFFFF] border-opacity-10 py-5 cursor-pointer">
          <Image
            alt="logo"
            height={78}
            width={68}
            src={"/assets/icons/logo.svg"}
          />
        </div>
      </Link>

      <div className="flex flex-col items-center justify-between flex-1 py-5 ">
        <nav className="space-y-3">
          {NavItems.map(({ text, navTabId, icon, activeIcon }, index) => (
            <div
              className={`${navTabId === activeTab ? " bg-[#F5931B] " : "bg-[#191B1F]"
                } rounded-lg flex flex-col justify-center items-center p-5 cursor-pointer duration-300`}
              key={index + 1}
              onClick={() => {
                clickHandle(text);
              }}
            >
              {navTabId === activeTab ? <>{activeIcon}</> : <>{icon}</>}

              <h1>{text}</h1>
            </div>
          ))}
        </nav>

        {
          active && (
            <button
              onClick={disconnect}
              className="border border-[#5761707A] rounded-lg flex items-center justify-center py-2 px-6">
              <Logout />
              <span className="font-medium  text-base text-[#F6543E] ml-1">
                Logout
              </span>
            </button>
          )
        }

      </div>
    </div>
  );
};

export default Sidebar;
