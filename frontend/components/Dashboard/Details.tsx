import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import contractAddresses from "../../utils/contractAddresses.json";
import abis from "../../utils/abis.json";
import { BitStackerNFT } from "../../types";
import { Bitcoin, Chart as ChartIcon, Etherum, Timer } from "../../assests/icons";
import Chart from "./Chart";
import UpdateModel from "./UpdateModel";
import WithdrawModel from "./WithdrawModel";
import DonutChart from "./DonutChart";
import axios from "axios";

let defaultRevenue = {
  1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "",
  9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "",
  17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "",
  25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", sheetName: "",
  addresses: "", redeemedReward: "0", totalReward: "0", totalRewardLastMonth: "0", availableBalance: "0"
}


export interface Balances {
  total: number;
  totalBlack: number;
  totalBlue: number;
  black: string;
  blue: string;
  vipBlack: string;
  vipBlue: string;
}

export interface Hashes {
  total: number;
  totalBlackHases: number;
  totalBlueHases: number;
  blackHash: string;
  blueHash: string;
  vipBlackHash: string;
  vipBlueHash: string;
}

const Details = () => {

  const { account, library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [balances, setBalances] = useState<Balances>();
  const [hashes, setHashes] = useState<Hashes>();
  const [showWithDrawModal, setShowWithdrawModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({
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

        setContactInfo({
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

  const [revenue, setRevenue] = useState(defaultRevenue);

  const fetchRevenueData = async () => {
    try {
      const res = await axios.post("/api/getUserInfo", { address: account });
      const data: any = res.data[0] as Object;
      setRevenue({ ...data, availableBalance: Number(data.totalReward ?? 0) - Number(data.redeemedReward ?? 0) })
    }
    catch (e) {
      console.error(e);
    }

  }

  useEffect(() => {
    fetchContractDetails();
    fetchRevenueData();
  }, [provider]);

  useEffect(() => {
    if (showWithDrawModal || showUpdateModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showWithDrawModal]);



  // https://docs.google.com/spreadsheets/d/1MarRDOEqIK9EtBqACrxICnCDC6IOCWJdxUYktoJU2pY/edit#gid=0
  // 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2

  return (
    <>
      <div className="flex space-x-5">

        <div className="flex-1 space-y-4">
          <div className="rounded-3xl bg-[#121212] flex items-center py-4 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Etherum />
            </div>

            <div className="ml-5">
              <h2 className="font-medium text-xl">NFT holding wallet</h2>
              <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                {account}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-[#121212] justify-between flex items-center py-4 px-6">
            <div className="flex flex-col">
              <div className="flex items-center">
                <h2 className="font-medium text-xl">BTC withdrawal address:</h2>
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
              onClick={() => setShowUpdateModal(true)}

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
                    {revenue.totalReward ?? 0}
                  </p>
                </div>
                <ChartIcon />
              </div>
            </div>

            <div className="rounded-3xl flex-1 bg-[#121212] flex items-center py-4 px-6">
              <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
                <Bitcoin />
              </div>
              <div className="ml-5 flex items-center justify-between flex-1">
                <div>
                  <h2 className="font-medium text-xl"> Redeemed </h2>
                  <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                    {revenue.redeemedReward ?? 0}
                  </p>
                </div>
                <ChartIcon />
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
                  {hashes?.total} Terrahash
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
                    {revenue.availableBalance}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowWithdrawModal(true);
                  }}
                  className="bg-[#F5931B] rounded-xl px-8 py-3"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        <DonutChart balances={balances} hashes={hashes} />

        {
          showUpdateModal && (
            <UpdateModel setShowUpdateModal={setShowUpdateModal} setContactInfo={setContactInfo} contactInfo={contactInfo} />
          )
        }

        {
          showWithDrawModal && (
            <WithdrawModel userAddress={account!} setShowWithdrawModal={setShowWithdrawModal} contactInfo={contactInfo} availableBalance={revenue.availableBalance} />
          )
        }

      </div>

      <Chart revenue={revenue} />

    </>
  );
};

export default Details;