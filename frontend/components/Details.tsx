import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import contractAddresses from "../utils/contractAddresses.json";
import abis from "../utils/abis.json";
import { BitStackerNFT } from "../types";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bitcoin, Chart, Etherum, Timer } from "../assets/icons";

interface Balances {
  total: number;
  black: string;
  blue: string;
  vipBlack: string;
  vipBlue: string;
}

interface Hashes {
  total: number;
  blackHash: string;
  blueHash: string;
  vipBlackHash: string;
  vipBlueHash: string;
}
ChartJS.register(ArcElement);

export const data = {
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["#171717", "#215FFF"],
      borderColor: ["#363636", "#215FFF"],
      borderWidth: 1,
    },
  ],
};
const Details = () => {
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [balances, setBalances] = useState<Balances>();
  const [hashes, setHashes] = useState<Hashes>();
  const [contactInfo, setContactInfo] = useState({
    bitCoinAddress: "",
    emailAddress: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  useEffect(() => {
    if (showModal || showModalUpdate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  const fetchContractDetails = async () => {
    if (provider && account) {
      try {
        const contract = new Contract(
          contractAddresses.BitStackerNFT,
          abis.BitStackerNFT,
          provider
        ) as BitStackerNFT;
        const _userBalance = contract.balancesOf(account);
        const _userHashes = contract.hashesOf(account);
        const _contactInfo = contract.contactInfo(account);

        const [userBalance, userHashes, contactInfoX] = await Promise.all([
          _userBalance,
          _userHashes,
          _contactInfo,
        ]);

        setContactInfo(contactInfoX);

        const balance = {
          black: userBalance._black.toString(),
          blue: userBalance._blue.toString(),
          vipBlack: userBalance._vipBlack.toString(),
          vipBlue: userBalance._vipBlue.toString(),
        };
        const totalBalance =
          Number(balance.black) +
          Number(balance.blue) +
          Number(balance.vipBlack) +
          Number(balance.vipBlue);

        const hashes = {
          blackHash: userHashes._blackHash.toString(),
          blueHash: userHashes._blueHash.toString(),
          vipBlackHash: userHashes._vipBlackHash.toString(),
          vipBlueHash: userHashes._vipBlueHash.toString(),
        };
        const totalHashes =
          Number(hashes.blackHash) +
          Number(hashes.blueHash) +
          Number(hashes.vipBlackHash) +
          Number(hashes.vipBlueHash);

        setBalances({ total: totalBalance, ...balance });
        setHashes({ total: totalHashes, ...hashes });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUpdateContact = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new Contract(
        contractAddresses.BitStackerNFT,
        abis.BitStackerNFT,
        signer
      ) as BitStackerNFT;

      const tx = await contract.resetContactInfo({
        bitCoinAddress: "321321321",
        emailAddress: "new@fmailc.com",
      });
      await tx.wait(1);

      fetchContractDetails();
    }
  };

  useEffect(() => {
    fetchContractDetails();
  }, [provider]);

  return (
    <div className="flex space-x-5">
      <div className="flex-1 space-y-4">
        <div className="rounded-3xl bg-[#121212] flex items-center py-4 px-6">
          <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
            <Etherum />
          </div>

          <div className="ml-5">
            <h2 className="font-medium text-xl">Ethereum Wallet Address:</h2>
            <p className="opacity-50 font-lighter text-2xl leading-[36px]">
              {account}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-[#121212] justify-between flex items-center py-4 px-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h2 className="font-medium text-xl">BitCoin Address:</h2>
              <p className="opacity-50 font-lighter ml-4 text-base leading-[36px]">
                {contactInfo.bitCoinAddress}
              </p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-xl">Email Address:</h2>
              <p className="opacity-50 font-lighter ml-4 text-base leading-[36px]">
                {contactInfo.bitCoinAddress}
              </p>
            </div>
          </div>

          <button
            className="bg-[#F5931B] rounded-xl px-8 py-3"
            onClick={() => {
              setShowModalUpdate(true);
            }}
          >
            Update
          </button>
        </div>

        <div className="flex items-center space-x-5">
          <div className="rounded-3xl flex-1 bg-[#121212] flex items-center py-4 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Bitcoin />
            </div>
            <div className="ml-5 flex items-center justify-between flex-1">
              <div>
                <h2 className="font-medium text-xl">Total BTC Earned</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0.18300
                </p>
              </div>
              <Chart />
            </div>
          </div>

          <div className="rounded-3xl flex-1 bg-[#121212] flex items-center py-4 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Bitcoin />
            </div>
            <div className="ml-5 flex items-center justify-between flex-1">
              <div>
                <h2 className="font-medium text-xl">Total BTC Earned</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0.18300
                </p>
              </div>
              <Chart />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="rounded-3xl bg-[#121212] flex items-center py-4 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Timer />
            </div>
            <div className="ml-5">
              <h2 className="font-medium text-xl">Total hashpower</h2>
              <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                {hashes?.total}
              </p>
            </div>
          </div>
          <div className="rounded-3xl flex-1 opacity-50 bg-[#121212] flex items-center py-4 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Bitcoin />
            </div>
            <div className="ml-5 flex-1 flex justify-between items-center">
              <div>
                <h2 className="font-medium text-xl">Available Balance</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-[#F5931B] rounded-xl px-8 py-3"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#121212] flex flex-col justify-between rounded-3xl px-5 py-3 max-w-[442px] w-full ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">
            <span className="text-[#F4931E]">NFT</span> Portfolio
          </h1>

          <div
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
            }}
            className="bg-[#000000] relative rounded-full flex items-center justify-center font-lighter text-xs px-4 py-2  cursor-pointer"
          >
            <span>Monthly</span>
            <svg
              width="8"
              height="7"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_597_1310)">
                <path
                  d="M1.19976 2.32935L3.52908 4.65866L5.8584 2.32935"
                  stroke="white"
                  strokeWidth="0.873494"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_597_1310">
                  <rect
                    width="6.98795"
                    height="6.98795"
                    fill="white"
                    transform="translate(7.02344) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              className={`${
                isDropDownOpen ? " block " : " hidden "
              } absolute top-9 left-0 bg-[#000000] w-full p-2 rounded-lg space-y-1`}
            >
              <h5
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
                className="text-center duration-300 hover:bg-[#121212] p-1 rounded-lg"
              >
                Weekly
              </h5>
              <h5
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
                className="text-center duration-300 hover:bg-[#121212] p-1 rounded-lg"
              >
                Yearly
              </h5>
            </div>
          </div>
        </div>

        <div className=" w-[270px] mx-auto my-4">
          <Doughnut width={250} height={250} data={data} />
        </div>

        <div className="flex items-center justify-center space-x-5">
          <div className="flex items-center">
            <div className="bg-[#215FFF] w-3 h-3 rounded-full" />
            <h3 className="font-medium text-xl ml-1.5">Blue</h3>
          </div>{" "}
          <div className="flex items-center">
            <div className="bg-[#000000] w-3 h-3 rounded-full" />
            <h3 className="font-medium text-xl ml-1.5">Black</h3>
          </div>
        </div>
      </div>
      {/* showModalUpdate */}

      {showModalUpdate && (
        <div className="fixed top-0 left-0 bg-[#121212] bg-opacity-40 w-full h-full flex items-center justify-center ">
          <div className="bg-[#121212] max-w-[687px] mx-auto border w-full border-[#F7931B] border-opacity-40 rounded-3xl pt-5 pb-10 px-8 box-shadow">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">
                Withdraw <span className="text-[#F7931B]">Bitcoin</span>
              </h1>

              <div
                onClick={() => {
                  setShowModalUpdate(false);
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

            <form className="flex flex-col items-center mt-5 space-y-5">
              <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                <input
                  value={"previousemail@gmail.com"}
                  className="w-full bg-transparent outline-none font-medium text-lg"
                />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">New Email Address</span>
                </p>
              </div>
              <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                <input
                  value={"previous bitcoin address"}
                  className="w-full bg-transparent outline-none font-medium text-lg"
                />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">New Bitcoin Address</span>
                </p>
              </div>
              {/* <div className="bg-[#0B0B0B] w-full rounded-[50px] py-4 px-6 my-1 border border-[#000000]">
                <input
                  className="w-full bg-transparent outline-none font-medium text-lg opacity-40"
                  placeholder="Bitcoin Wallet address"
                />
              </div> */}
              <button
                onClick={handleUpdateContact}
                className="bg-[#F7931B] py-4 mt-8 font-bold text-2xl px-20 rounded-[50px]"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

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
                <input className="w-full bg-transparent outline-none font-medium text-lg" />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">Enter Amount</span>
                </p>
              </div>

              <div className="self-start w-full pl-4 space-y-1">
                <div className="my-4">
                  <div className="flex ">
                    <h2 className="font-semibold text-xl">
                      Bitcoin Address:{" "}
                      <span className="opacity-70 font-normal text-base">
                        {" "}
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </span>{" "}
                    </h2>
                  </div>
                  <div className="flex ">
                    <h2 className="font-semibold text-xl">
                      Email Address:{" "}
                      <span className="opacity-70 font-normal text-base">
                        {" "}
                        someone@email.com
                      </span>{" "}
                    </h2>
                  </div>
                </div>
                <p className="text-center w-full opacity-50 text-base italic my-2">
                  Make Sure your contact info is updated
                </p>
              </div>
              {/* <div className="bg-[#0B0B0B] w-full rounded-[50px] py-4 px-6 my-1 border border-[#000000]">
                <input
                  className="w-full bg-transparent outline-none font-medium text-lg opacity-40"
                  placeholder="Bitcoin Wallet address"
                />
              </div> */}
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

export default Details;
