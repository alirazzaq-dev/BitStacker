import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

const Navbar = () => {
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React<ethers.providers.JsonRpcProvider>();

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // setHasMetamask(true);
        await activate(injected);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No Wallet found. Please install any");
    }
  };

  const [balance, setBalance] = useState("0.0000");
  const fetchEthBalance = async () => {
    if (provider && account) {
      const balanceWei = await provider.getBalance(account);
      const balanceEths = ethers.utils.formatEther(balanceWei);
      setBalance(Number(balanceEths).toFixed(4));
    }
  };

  useEffect(() => {
    fetchEthBalance();
  }, [provider]);

  return (
    <div className="flex items-center justify-between">
      <div className="bg-[#121212] flex items-center p-2 px-4 rounded-lg">
        <h3 className="font-semibold text-xl pr-2 border-r border-[#FFFFFF] border-opacity-10 mr-2">
          <span className="text-[#F4931E]">Notifi</span>
          cations 🛎️
        </h3>
        <h4 className="font-normal text-xs">
          Your Bitcoin wallet has not been registered. Please send email to
          <span className="text-[#F4931E] underline">
            {" "}
            support@bitstacker.nft
          </span>
        </h4>

        <div className="ml-10">
          <Image
            alt="close"
            width={11}
            height={13}
            src={"/assets/icons/close.svg"}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {active && (
          <>
            <div className="flex items-center relative">
              <div className="bg-[#F5931B] w-2 h-2 rounded-full absolute top-0 right-0 z-50"></div>
              <Image
                alt="bell"
                width={25}
                height={25}
                src={"/assets/icons/bell.svg"}
              />
            </div>

            <div className="bg-[#121212] rounded-lg flex items-center px-3 py-2">
              <Image
                alt="etherum"
                width={11}
                height={16}
                src={"/assets/icons/etherum.svg"}
              />
              <span className="font-normal ml-2 text-base">{balance} ETH</span>
            </div>
          </>
        )}

        {!active && (
          <button
            className="rounded-lg border border-[#B4B4B4] py-2 px-4 font-normal text-base"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;
