import React from "react";
import {
  Announcements,
  Chart,
  Details,
  Navbar,
  Sidebar,
  SmallFooter,
} from "../components";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const Dashboard = (props: any) => {

  const { active, library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();

  return (
    <div className="relative bg-[#070503] min-h-screen">
      <div className="flex ">
        <Sidebar />

        <div className="ml-[176px] flex flex-col justify-between min-h-screen   overflow-x-hidden main py-7 px-5">
          <div>
            <Navbar />
            <div className="my-5 space-y-4">
              <Announcements />

              {active && (
                <>
                  <Details/>
                </>
              )}

              {!active && (
                <div className=" flex justify-center items-center py-40">
                  <h1 className="opacity-70 font-bold text-xl">
                    Please Connect Wallet
                  </h1>
                </div>
              )}

            </div>
          </div>
          <div className="pt-2">
            <SmallFooter />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
