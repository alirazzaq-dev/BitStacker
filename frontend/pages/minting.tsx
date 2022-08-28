// import type { NextPage } from "next";
import React, { useEffect } from "react";

import Image from "next/image";
import { useState } from "react";
import { Navbar, Sidebar, SmallFooter } from "../components";
import { ArrowLeft, ArrowRight, Play } from "../assets/icons";
import { GetStaticProps } from "next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract, ethers } from "ethers";

import { BitStackerNFT } from "../types";
import contractAddresses from "../utils/contractAddresses.json";
import abis from "../utils/abis.json";
import { excludeDecimals } from "../utils/helpers";
import { InjectedConnector } from "@web3-react/injected-connector";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      data: "SSG",
    },
  };
};

interface Token {
  hashRate: BigNumber;
  id: number;
  price: BigNumber;
  terraHashedSold: BigNumber;
}

interface Tokens {
  vipBlack: Token;
  vipBlue: Token;
  black: Token;
  blue: Token;
}

enum SaleTpe {
  CLOSED,
  PRIVATE,
  PUBLIC,
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

const Minting = () => {
  const {
    active,
    activate,
    library: provider,
  } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [hashAvailabe, setHashAvailable] = useState<string>("160,000");
  const [saleType, setSaleType] = useState<SaleTpe>(SaleTpe.CLOSED);
  const [tokens, setTokens] = useState<Tokens>();
  const [selectedToken, setSelectedToken] = useState<number>(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<{
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
  }>();
  const [addresses, setAddresses] = useState({ bitcoin: "", email: "" });
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  // const [selectedText, setSelectedText] = useState("Black");

  const fetchContractDetails = async () => {
    if (provider) {
      try {
        const contract = new Contract(
          contractAddresses.BitStackerNFT,
          abis.BitStackerNFT,
          provider
        ) as BitStackerNFT;
        const _available = contract.terrahashesAvailabe();
        const _saleType = contract.saleType();
        const _vipBlack = contract.vipBlack();
        const _vipBlue = contract.vipBlue();
        const _black = contract.black();
        const _blue = contract.blue();

        const [available, saleType, vipBlack, vipBlue, black, blue] =
          await Promise.all([
            _available,
            _saleType,
            _vipBlack,
            _vipBlue,
            _black,
            _blue,
          ]);

        setSaleType(saleType);
        setTokens({ vipBlack, vipBlue, black, blue });
        setHashAvailable(
          available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        const _price = {
          [0]: Number(ethers.utils.formatEther(vipBlack.price)),
          [1]: Number(ethers.utils.formatEther(vipBlue.price)),
          [2]: Number(ethers.utils.formatEther(black.price)),
          [3]: Number(ethers.utils.formatEther(blue.price)),
          [4]: Number(ethers.utils.formatEther("0")),
        };
        setPrice(_price);
        console.log("_price: ", _price);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddresses = (val: string, type: "bitcoin" | "email") => {
    if (type === "bitcoin") {
      setAddresses((e) => ({ ...e, bitcoin: val }));
    } else {
      setAddresses((e) => ({ ...e, email: val }));
    }
  };

  const handleMint = async () => {
    if (provider) {
      try {
        const signer = provider.getSigner();
        const contract = new Contract(
          contractAddresses.BitStackerNFT,
          abis.BitStackerNFT,
          signer
        ) as BitStackerNFT;

        if (addresses.bitcoin && addresses.email && price) {
          const value = (
            quantity * price[selectedToken as 0 | 1 | 2 | 3]
          ).toFixed(4);
          // console.log("selectedToken: ", selectedToken)
          // console.log("quantity: ", quantity)
          const tx = await contract.mint(
            selectedToken,
            quantity,
            {
              bitCoinAddress: addresses.bitcoin,
              emailAddress: addresses.email,
            },
            { value: ethers.utils.parseEther(value) }
          );
          await tx.wait(1);
          fetchContractDetails();
        } else {
          alert("Please fill in your BitCoin and Email address before minting");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      await activate(injected);
    }
  };

  useEffect(() => {
    fetchContractDetails();
  }, [provider]);

  return (
    <div className="flex bg-[#070503] min-h-screen">
      <Sidebar />

      <div className="ml-48 main py-7 px-5 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="flex flex-col items-center mt-8 justify-center">
            <h1 className="font-bold text-[60px] leading-[80px] tracking-[0.14rem]">
              {hashAvailabe}
            </h1>
            <h3 className="font-light text-2xl leading-[28px]">
              Available TH/s
            </h3>
          </div>

          <div className="flex justify-between">
            <div>
              <div className="flex items-end">
                <h1
                  style={{ backgroundImage: "url('/assets/icons/curve.svg')" }}
                  className="font-bold text-[90px]  bg-no-repeat bg-right-bottom	"
                >
                  {(
                    quantity *
                    (price
                      ? price[selectedToken as 0 | 1 | 2 | 3 | 4]
                      : selectedToken)
                  ).toFixed(2)}
                </h1>
                <p className="mb-8 font-light text-4xl ml-2">ETH</p>
              </div>

              <div className="flex my-5 items-center">
                <div onClick={() => handleQuantity("decrease")}>
                  {/* <Image
                    alt="arrow-left"
                    width={41}
                    height={20}
                    src={"/assets/icons/arrow-left.svg"}
                    onClick={() => handleQuantity("decrease")}
                  /> */}
                  <ArrowLeft />
                </div>

                <h2 className="font-light text-3xl mx-5">{quantity}</h2>

                <div onClick={() => handleQuantity("increase")}>
                  <ArrowRight />
                </div>
              </div>

              <p className="opacity-50 font-light text-2xl">
                Select quantity to mint
              </p>

              <div className="my-12 flex ">
                <h3 className="text-[#F3F3F3] font-normal text-xl">
                  Select which tier to mint
                </h3>

                <select
                  name="tokenType"
                  id="tokenType"
                  className="ml-5 w-fit-content bg-transparent font-bold text-lg outline-none p-0"
                  defaultValue={selectedToken}
                  onChange={(e) => setSelectedToken(Number(e.target.value))}
                >
                  <option
                    className="font-medium my-1 text-base"
                    value={0}
                    style={{ background: "black" }}
                  >
                    VIP Black
                  </option>

                  <option
                    className="font-medium my-1 text-base"
                    value={1}
                    style={{ background: "black" }}
                  >
                    VIP Blue
                  </option>

                  <option
                    className="font-medium my-1 text-base"
                    value={2}
                    style={{ background: "black" }}
                  >
                    Black
                  </option>

                  <option
                    className="font-medium my-1 text-base"
                    value={3}
                    style={{ background: "black" }}
                  >
                    Blue
                  </option>

                  <option
                    className="font-medium my-1 text-base"
                    value={4}
                    style={{ background: "black" }}
                  >
                    Closed
                  </option>
                </select>

                {/* <div>
                  <div
                    onClick={() => { setIsDropDownOpen(!isDropDownOpen);}}
                    className={`${isDropDownOpen && ` bg-[#231F19] rounded-xl`} ml-1 cursor-pointer p-1 h-[72px]`} 
                    >

                    <div className="flex items-center">
                      <div
                        className={`${
                          isDropDownOpen
                            ? `${
                                selectedText === "Black"
                                  ? " bg-[#000000]"
                                  : " bg-[#02B2F2]"
                              } `
                            : "bg-transparent border border-[#00000033]"
                        } w-4 h-4 rounded-full flex items-center justify-center`}
                      >
                        <div className="bg-[#fff] w-1 h-1 rounded-full"></div>
                      </div>
                      <span className="font-bold text-2xl mx-3">
                        {selectedText}
                      </span>

                      <svg
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 1L5.5 10.5M5.5 10.5L10 4.5M5.5 10.5L1 4.5"
                          stroke="url(#paint0_linear_166_466)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_166_466"
                            x1="10"
                            y1="0.5"
                            x2="10"
                            y2="7.8136"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0" />
                            <stop offset="1" stopColor="white" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {
                    isDropDownOpen && (
                      <div
                        onClick={() => { setSelectedText( selectedText === "Black" ? "Blue" : "Black")}}
                        className="flex items-center"
                      >
                        <div
                          className={`${
                            isDropDownOpen
                              ? `${
                                  selectedText === "Black"
                                    ? " bg-[#02B2F2]"
                                    : " bg-[#000000]"
                                } `
                              : "bg-transparent border border-[#00000033]"
                          } w-4 h-4 rounded-full flex items-center justify-center`}
                        >
                          <div className="bg-[#fff] w-1 h-1 rounded-full"></div>
                        </div>
                        <span className="font-bold text-2xl mx-3">
                          {selectedText === "Black" ? "Blue" : "Black"}
                        </span>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>

              <div className="w-[400px]">
                <input
                  type="text"
                  className="border border-[#F7931B] my-1 outline-none text-base bg-transparent rounded-full py-2 px-3 w-full"
                  value={addresses.email}
                  placeholder="Enter Your Email Address"
                  onChange={(e) => handleAddresses(e.target.value, "email")}
                />
                <input
                  type="text"
                  className="border border-[#F7931B] my-1 outline-none text-base bg-transparent rounded-full py-2 px-3 w-full"
                  value={addresses.bitcoin}
                  placeholder="Enter Your Bitcoin Address"
                  onChange={(e) => handleAddresses(e.target.value, "bitcoin")}
                />

                <button
                  onClick={handleMint}
                  className="bg-transparent text-[#F7931B] text-base mt-2 w-full border-2 border-[#F7931B] rounded-full py-5 px-32"
                >
                  Mint
                </button>
              </div>

              <div className="flex items-center mt-11 justify-center">
                <Play />

                <span className="font-normal text-lg ml-2">How it works?</span>
              </div>
            </div>

            <div className="flex-1">
              <div
                className="relative bg-right-bottom	 bg-no-repeat"
                style={{
                  backgroundImage: "url('/assets/pictures/pattern.png')",
                }}
              >
                <div className="bg-[#F7931B] absolute top-0 right-0  h-[300px] w-[300px] blur-[5000px]"></div>

                <img
                  alt="minting-banner"
                  src={"/assets/pictures/minting-banner.png"}
                />
              </div>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    </div>
  );
};

export default Minting;
