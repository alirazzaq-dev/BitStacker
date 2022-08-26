import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

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
                  <Details setShowModal={setShowModal} />
                  <Chart />
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

      {showModal && (
        <div className="fixed top-0 left-0 bg-[#121212] bg-opacity-40 w-full h-full flex items-center justify-center ">
          <div className="bg-[#121212] max-w-[687px] mx-auto border w-full border-[#F7931B] border-opacity-40 rounded-3xl pt-5 pb-10 px-8 box-shadow">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">
                Withdraw <span className="text-[#F7931B]">Bitcoin</span>
              </h1>

              <div
                onClick={() => {
                  setShowModal(false);
                }}
                className="bg-[#FF5B5B] cursor-pointer bg-opacity-5 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.8"
                    d="M5.91615 4.99993L9.80995 8.89392C10.0634 9.14721 10.0634 9.55675 9.80995 9.81003C9.55667 10.0633 9.14714 10.0633 8.89386 9.81003L4.99994 5.91604L1.10614 9.81003C0.85274 10.0633 0.443335 10.0633 0.190051 9.81003C-0.0633505 9.55675 -0.0633505 9.14721 0.190051 8.89392L4.08385 4.99993L0.190051 1.10593C-0.0633505 0.852639 -0.0633505 0.443107 0.190051 0.189818C0.316278 0.0634708 0.482246 0 0.648097 0C0.813947 0 0.979797 0.0634708 1.10614 0.189818L4.99994 4.08382L8.89386 0.189818C9.0202 0.0634708 9.18605 0 9.3519 0C9.51775 0 9.6836 0.0634708 9.80995 0.189818C10.0634 0.443107 10.0634 0.852639 9.80995 1.10593L5.91615 4.99993Z"
                    fill="#FF5B5B"
                  />
                </svg>
              </div>
            </div>
            <form className="flex flex-col items-center mt-5">
              <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                <input
                  className="w-full bg-transparent outline-none font-medium text-lg"
                  placeholder="142"
                />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">Withdrawal amount</span>
                </p>
              </div>
              <div className="bg-[#0B0B0B] w-full rounded-[50px] py-4 px-6 my-1 border border-[#000000]">
                <input
                  className="w-full bg-transparent outline-none font-medium text-lg opacity-40"
                  placeholder="Bitcoin Wallet address"
                />
              </div>
              <div className="bg-[#0B0B0B] w-full rounded-[50px] py-4 px-6 my-1 border border-[#000000] flex items-center justify-between">
                <input
                  className="w-full bg-transparent outline-none font-medium text-lg opacity-40"
                  placeholder="Bitcoin Wallet address"
                />
                <span className="opacity-30">optional</span>
              </div>
              <button className="bg-[#F7931B] py-4 mt-8 font-bold text-2xl px-20 rounded-[50px]">
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
