import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import contractAddresses from "../utils/contractAddresses.json";
import abis from "../utils/abis.json";
import { BitStackerNFT } from "../types";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title } from "chart.js";

import {
  ArrowDown,
  Bitcoin,
  Chart,
  Corss,
  Etherum,
  Timer,
} from "../assets/icons";
import { ValidateBitcoinAddress, ValidateEmail } from "../utils/helpers";

interface Balances {
  total: number;
  totalBlack: number;
  totalBlue: number;
  black: string;
  blue: string;
  vipBlack: string;
  vipBlue: string;
}

interface Hashes {
  total: number;
  totalBlackHases: number;
  totalBlueHases: number;
  blackHash: string;
  blueHash: string;
  vipBlackHash: string;
  vipBlueHash: string;
}

const Details = () => {
  const { account, library: provider } =
    useWeb3React<ethers.providers.JsonRpcProvider>();
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [balances, setBalances] = useState<Balances>();
  const [hashes, setHashes] = useState<Hashes>();
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    bitCoinAddress: "",
    emailAddress: "",
  });
  const [updatedContactInfo, setUpdatedContactInfo] = useState({
    bitCoinAddress: "",
    emailAddress: "",
  });

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

        console.log("contactInfoX: ", contactInfoX);

        setContactInfo({
          bitCoinAddress: contactInfoX.bitCoinAddress,
          emailAddress: contactInfoX.emailAddress,
        });

        setUpdatedContactInfo({
          bitCoinAddress: contactInfoX.bitCoinAddress,
          emailAddress: contactInfoX.emailAddress,
        });

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
        const totalBlack = Number(balance.black) + Number(balance.vipBlack);
        const totalBlue = Number(balance.blue) + Number(balance.vipBlue);

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
        const totalBlackHases =
          Number(hashes.blackHash) + Number(hashes.vipBlackHash);
        const totalBlueHases =
          Number(hashes.blueHash) + Number(hashes.vipBlueHash);

        setBalances({ total: totalBalance, totalBlack, totalBlue, ...balance });
        setHashes({
          total: totalHashes,
          totalBlackHases,
          totalBlueHases,
          ...hashes,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUpdatedContactInfo = (val: string, type: "bitcoin" | "email") => {
    if (type === "bitcoin") {
      setUpdatedContactInfo((e) => ({ ...e, bitCoinAddress: val }));
    } else {
      setUpdatedContactInfo((e) => ({ ...e, emailAddress: val }));
    }
  };

  const submitUpdatedContactInfo = async (e) => {
    e.preventDefault();
    // const validEmail = ValidateEmail(updatedContactInfo.emailAddress);
    // if (!validEmail) {
    //   alert("Invalid email address");
    //   throw ("INVALID EMAIL")
    // }
    // const validbitcoin = ValidateBitcoinAddress(updatedContactInfo.bitCoinAddress);
    // if (!validbitcoin) {
    //   alert("Invalid bitcoin address");
    //   throw ("INVALID Bitcoin Address")
    // }

    // if (provider && validEmail && validbitcoin) {
    //   try{
    //     const signer = provider.getSigner();
    //     const contract = new Contract(
    //       contractAddresses.BitStackerNFT,
    //       abis.BitStackerNFT,
    //       signer
    //     ) as BitStackerNFT;

    //     const tx = await contract.resetContactInfo({
    //       bitCoinAddress: updatedContactInfo.bitCoinAddress,
    //       emailAddress: updatedContactInfo.emailAddress,
    //     });
    //     await tx.wait(1);

    //     setContactInfo({
    //       bitCoinAddress: updatedContactInfo.bitCoinAddress,
    //       emailAddress: updatedContactInfo.emailAddress
    //     });

    //     // fetchContractDetails();
    //   }
    //   catch(e){
    //     console.error(e);
    //   }
    // }
  };

  ChartJS.register(ArcElement, Title);

  enum DONUT {
    NFTS,
    HASHES,
  }
  const [donut, setDonut] = useState(DONUT.NFTS);

  const dataNFTs = {
    labels: ["Black NFts", "Blue NFTs"],
    datasets: [
      {
        label: "Dataset",
        data: [balances?.totalBlack, balances?.totalBlue],
        backgroundColor: ["#171717", "#215FFF"],
        borderColor: ["#363636", "#215FFF"],
        hoverOffset: 4,
        cutout: 120,
      },
    ],
  };

  const dataHashes = {
    labels: ["Black Hashes", "Blue Hashes"],
    datasets: [
      {
        label: "Dataset",
        data: [hashes?.totalBlackHases, hashes?.totalBlueHases],
        backgroundColor: ["#171717", "#215FFF"],
        borderColor: ["#363636", "#215FFF"],
        cutout: 100,
      },
    ],
  };

  useEffect(() => {
    fetchContractDetails();
  }, [provider]);

  useEffect(() => {
    if (showModal || showModalUpdate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

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
                {contactInfo.emailAddress}
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

          <select
            className="bg-[#000000] cursor-pointer"
            onChange={(e) => setDonut(Number(e.target.value))}
          >
            <option value={DONUT.NFTS}>NFTs</option>
            <option value={DONUT.HASHES}>Hashes</option>
          </select>
        </div>
        <div className=" w-[270px] mx-auto my-4 flex items-center justify-between"></div>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
            {donut === DONUT.NFTS
              ? ` ${balances?.total} Tokens`
              : `${hashes?.total} Terrahash`}
          </div>
          <Doughnut
            width={250}
            height={250}
            data={donut === DONUT.NFTS ? dataNFTs : dataHashes}
            // data={data}
          />
        </div>
      </div>

      {/* showModalUpdate */}
      {showModalUpdate && (
        <div className="fixed top-0 left-0 bg-[#121212] bg-opacity-40 w-full h-full flex items-center justify-center ">
          <div className="bg-[#121212] max-w-[687px] mx-auto border w-full border-[#F7931B] border-opacity-40 rounded-3xl pt-5 pb-10 px-8 box-shadow">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">
                Update <span className="text-[#F7931B]">Personal Info</span>
              </h1>
              <div
                onClick={() => {
                  setShowModalUpdate(false);
                }}
                className="bg-[#FF5B5B] cursor-pointer bg-opacity-5 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <Corss />
              </div>
            </div>

            <form className="flex flex-col items-center mt-5 space-y-5">
              <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                <input
                  value={updatedContactInfo.bitCoinAddress}
                  onChange={(e) =>
                    handleUpdatedContactInfo(e.target.value, "bitcoin")
                  }
                  className="w-full bg-transparent outline-none font-medium text-lg"
                />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">New Bitcoin Address</span>
                </p>
              </div>
              <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                <input
                  value={updatedContactInfo.emailAddress}
                  onChange={(e) =>
                    handleUpdatedContactInfo(e.target.value, "email")
                  }
                  className="w-full bg-transparent outline-none font-medium text-lg"
                />
                <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                  <span className="opacity-50">New Email Address</span>
                </p>
              </div>
              <button
                onClick={submitUpdatedContactInfo}
                className="bg-[#F7931B] py-4 mt-8 font-bold text-2xl px-20 rounded-[50px]"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw */}
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
                <Corss />
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

export const data = {
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
